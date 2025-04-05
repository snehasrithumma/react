import { useEffect, useState, useRef } from "react";

const ServerSentEvents =  () => {
    const [data, setData] = useState([]);
    const eventSourseRef = useRef(null)
    const retryRef = useRef(null)

    useEffect(() => {
        const conectSSE = () => {
            if (eventSourseRef.current) {
                eventSourseRef.current.close()
            }

            eventSourseRef.current = new EventSource("http://localhost:5000/events");

            eventSourseRef.current.onmessage = (event) => {
                setData((prev) => [...prev, event.data])
            }

            eventSourseRef.current.onError = () => {
                eventSourseRef.current.close()
                handleReconnect();
            }
        }

        const handleReconnect = () => {
            if (!retryRef.current) {
                retryRef.current = setInterval(() => {
                    conectSSE();
                }, 3000)
            }
        }

        conectSSE();

        return (() => {
            if (eventSourseRef.current) {
                eventSourseRef.current.close();
            }
            clearInterval(retryRef.current);
        })
    })
}

export default ServerSentEvents;