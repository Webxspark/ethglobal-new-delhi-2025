import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useConversation } from '@elevenlabs/react';
import { LoaderCircle, MicOff, PhoneOff, SendHorizonal, Speech } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

// Types
interface ICalBookArgs {
    user_name: string;
    user_email: string;
    user_phone: string;
    start_time: string;
    duration?: number;
}

const FLASK_API_URL = "http://localhost:5000"; // Adjust as needed


const NoFormaWidget = () => {
    const [open, setOpen] = useState(false);
    const intInputRef = useRef<HTMLInputElement | null>(null);
    const {startSession, endSession,  sendUserMessage, isSpeaking, getId, status} = useConversation({
        clientTools: {
            // Calendar booking tool
            cal_book: (args: string) => {
                console.log("Booking args:", args);
                try {
                    const bookingData = JSON.parse(args) as ICalBookArgs;
                    console.log("Calendar booking initiated with:", bookingData);
                    
                    // Start the booking process in background
                    fetch(`${FLASK_API_URL}/new-schedule`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: bookingData.user_name,
                            email: bookingData.user_email,
                            start: bookingData.start_time,
                            phone: bookingData.user_phone
                        })
                    })
                    .then(response => response.text())
                    .then(responseText => {
                        console.log("Booking response:", responseText);
                        try {
                            const resp = JSON.parse(responseText);
                            if (resp.error) {
                                console.error("Booking failed:", resp.error);
                            } else {
                                console.log("Booking successful:", resp);
                            }
                        } catch (e) {
                            console.error("Failed to parse booking response:", responseText);
                        }
                    })
                    .catch(error => {
                        console.error("Booking error:", error);
                    });
                    
                    // Return immediately to avoid timeout
                    return `Booking meeting for ${bookingData.user_name} at ${bookingData.start_time}. Processing request...`;
                    
                } catch (error) {
                    console.error("Booking error:", error);
                    return `Error processing booking request: ${error}`;
                }
            },
            
            // End meeting tool
            end_meeting: () => {
                console.log("Meeting end requested");
                setTimeout(() => {
                    endSession();
                }, 5000);
                return "Meeting will end in 5 seconds. Thank you for your time!";
            },
            
            // Fetch free time slots tool
            fetch_free_time: () => {
                console.log("Fetching free time slots...");
                
                // Start the fetch process in background
                fetch(`${FLASK_API_URL}/free-slots`)
                    .then(response => response.text())
                    .then(responseText => {
                        console.log("Free slots raw response:", responseText);
                        try {
                            const data = JSON.parse(responseText);
                            console.log("Parsed free slots:", data);
                            
                            if (data.data && data.data.length > 0) {
                                const schedule = data.data[0];
                                const availability = schedule.availability[0];
                                console.log(`Available: ${availability.days.join(', ')} from ${availability.startTime} to ${availability.endTime} (${schedule.timeZone})`);
                            }
                        } catch (e) {
                            console.error("Failed to parse slots response:", responseText);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching free slots:", error);
                    });
                
                // Return immediately to avoid timeout
                return "Checking available time slots from our calendar system...";
            }
        }
    });
    useEffect(() => {
        if(status === "disconnecting" || status === "disconnected"){
            setOpen(false);
        }
    }, [status])

    useEffect(() => {
        if (open) {
            (async () => {
                await navigator.mediaDevices.getUserMedia({ audio: true });
            })();
            startSession({
                agentId: 'agent_2301k66hw3jjev4rappmn0r0rqth',
                connectionType: 'webrtc'
            });
        }
    }, [open])
    const handleIntSubmit = (e: FormEvent) => {
        e.preventDefault();
        const message = intInputRef.current?.value;
        if (message) {
            sendUserMessage(message);
            intInputRef.current!.value = '';
        }
    }
    return (
        <>
            <div className="fixed bottom-4 right-5">
                <Button onClick={() => setOpen(true)}>
                    Talk to us
                </Button>
            </div>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            NoForma Agent
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <div className="h-32 flex items-center justify-center">
                            {status === "connected" && <Speech className={cn("size-20 duration-100", isSpeaking && "text-blue-500")} />
                                || <LoaderCircle className="animate-spin" />
                            }
                        </div>
                        <form onSubmit={handleIntSubmit} className="flex items-center gap-3">
                            <Input ref={intInputRef} placeholder="Send a message" />
                            <Button>
                                <SendHorizonal />
                            </Button>
                        </form>
                        <div className="py-2 gap-3 flex items-center justify-end">
                            <Button onClick={() => endSession()} disabled={!open}>
                                <PhoneOff /> End Call
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            
        </>
    );
};

export default NoFormaWidget;