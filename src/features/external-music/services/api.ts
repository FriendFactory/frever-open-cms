export interface Playlist {
    id: number;
    sortOrder: number;
    readinessId: number;
    externalPlaylistId: string;
    externalPlaylist?: Partial<ExternalPlaylist>;
    countries: string[] | null;
}

export interface ExternalPlaylist {
    id: string;
    name: string;
    visibility: string;
    image: string;
    description: string;
    status: string;
    annotations: { [x: string]: string };
    lastUpdated: string;

    tracks?: ExternalTrack[];
}

export interface ExternalTrack {
    audioUrl: string;
    dateAdded: string;
    id: string;
    image: string;
    source: string;
    trackId: string;
    trackTitle: string;
    artistAppearsAs: string;
    releaseId: number;
    trackVersion: string;
    releaseArtistAppearsAs: string;
}

export interface ExternalTracksArtist {
    id: number;
    name: string;
    appearsAs: string;
    slug: string;
    image: string;
    isPlaceholderImage: "true" | "false";
}

export interface ExternalTracksRelease {
    id: number;
    title: string;
    version: string;
    type: string;
    artist: ExternalTracksArtist;
    slug: string;
    image: string;
    label: {
        id: string;
        name: string;
    };
    licensor: {
        id: string;
        name: string;
    };
    popularity: number;
}

export interface TracksSearchResultEntityTrack {
    id: string;
    title: string;
    version: string;
    artist: ExternalTracksArtist;
    trackNumber: number;
    duration: number;
    explicitContent: boolean;
    isrc: string;
    type: "audio";
    release: ExternalTracksRelease;
    discNumber: number;
    popularity: number;
    number: number;
    subscriptionStreaming: {
        releaseDate: string;
    };
}

export const SearchCountries = ["SE", "GB", "US"] as const;
