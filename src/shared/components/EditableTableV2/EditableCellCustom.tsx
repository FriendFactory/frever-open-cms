import React, { useEffect, useRef } from "react";

interface EditableCellCustomProps {
    children: React.ReactNode;
    toggler: (isToggle: boolean) => void;
}

export const EditableCellCustom = ({ toggler, children }: EditableCellCustomProps) => {
    const divRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (divRef.current) divRef.current.focus();
    }, []);

    const onFocus = () => toggler(true);
    const onBlur = () => toggler(false);

    return (
        <div ref={divRef} tabIndex={0} onFocus={onFocus} onBlur={onBlur}>
            <div onBlur={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
};
