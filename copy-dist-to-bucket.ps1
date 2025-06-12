$Bucket = $Env:Bucket

if (!$Bucket) {
    $Bucket = $args[0]
}

if (!$Bucket) {
    Write-Error "Please provide name of bucket as first argument or using Bucket environment variable"
    exit 1
}

if (!(Get-Module -ListAvailable | where { $_.Name -eq "AWSPowerShell.NetCore" })) {
    Write-Host "Module is not installed"
    Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
    Find-Module AWSPowerShell.NetCore | Install-Module -Confirm:$False
}
else {
    Write-Host "Module is installed, loading..."
}

Import-Module -Name AWSPowerShell.NetCore -ErrorAction Stop

# Deploys application to AWS Elastic Beanstalk
#

$AwsProfile = "xxxxxxxxx"
$AwsRegion = "xxxxxxxxx"

# Write-Host ($c | Format-Table | Out-String)

$ExistingObjects = Get-S3Object -BucketName $Bucket -KeyPrefix "/" -ProfileName $AwsProfile -Region $AwsRegion | select -ExpandProperty Key

if ($ExistingObjects.Length -ne 0) {
    Remove-S3Object `
        -BucketName $Bucket `
        -KeyCollection $ExistingObjects `
        -ProfileName $AwsProfile `
        -Region $AwsRegion `
        -Force
}

Write-S3Object `
    -BucketName $Bucket `
    -Folder "dist" `
    -KeyPrefix "/" `
    -SearchPattern "*.*" `
    -Recurse `
    -ProfileName $AwsProfile `
    -Region $AwsRegion