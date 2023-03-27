import Konva from "konva";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Circle, KonvaNodeComponent, Layer, Stage, Text } from "react-konva";

export const GameView = () => {
    const viewRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<Konva.Circle>(null)
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [posX, setPosX] = useState<number>(200);
    const [posY, setPosY] = useState<number>(300);

    let veloc = 50;

    useLayoutEffect(() => {
        setHeight(window.screen.height)
        setWidth(viewRef.current?.clientWidth)
    }, [viewRef]);

    const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
        const { key } = event;
        if (key === 'ArrowUp') {
            event.preventDefault();
            circleRef.current?.to({
                duration: 0.2,
                y: posY - 50,
            })
            setPosY((prev) => {
                prev -= 50;
                return prev;
            })
        } else if (key === 'ArrowDown') {
            event.preventDefault();
            circleRef.current?.to({
                duration: 0.2,
                y: posY + 50,
            })
            setPosY((prev) => {
                prev += 50;
                return prev;
            })
        }
    }, [posX, posY]);

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <div ref={viewRef}>
            <Stage height={height} width={width}>
                <Layer height={height} width={width}>
                    <Circle ref={circleRef} width={30} height={30} fill="#000" x={200} y={300} draggable />
                </Layer>
            </Stage>
        </div>
    );
}