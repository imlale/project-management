import { useRef, useEffect } from 'react';
import interact from 'interactjs';
import { Task } from '../models/projectTypes';

function DraggableElement({ children, taskData }: { children: React.ReactNode ,taskData: Task }) {
    const elementRef = useRef({} as HTMLDivElement);
    

    useEffect(() => {

        // Inicializa la interacción drag-and-drop en el elemento usando interact.js
        const position = { x: 0, y: 0 }
        interact(elementRef.current).draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true,
                    
                })
            ],
            listeners: {
                start(event) {
                    event.preventDefault()
                    console.log(event.type, event.target)
                    console.log("card", JSON.stringify(taskData))
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy

                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`
                },
            }
        })
    }, []);

    return (
        <div
            ref={elementRef}
            className="draggable-element"
        >
            {children}
        </div>
    );
}

export default DraggableElement;