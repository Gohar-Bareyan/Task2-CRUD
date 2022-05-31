import { Button, IconProps } from "@mui/material"
import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
    icon?: ReactElement<IconProps>;
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
    color?: string,
    border?: string,
    outline?: string,
    fontSize?: string
}


export default function ({ children, icon, backgroundColor, color, border, outline, fontSize }: Props) {
    return (
        <Button
            style={{
                backgroundColor,
                color,
                border,
                outline,
                fontSize
            }}
        >
            {icon}
            {children}
        </Button>
    )
}

