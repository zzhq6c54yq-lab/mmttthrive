
import React from "react";
import { Calendar, Clock, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UpcomingAppointments = () => {
  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      title: "Therapy Session with Dr. Johnson",
      date: "2023-06-15",
      time: "10:00 AM",
      type: "video",
    },
    {
      id: 2,
      title: "Mindfulness Workshop",
      date: "2023-06-18",
      time: "2:00 PM",
      type: "group",
    },
  ];

  return (
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#B87333]" />
          Upcoming Appointments
        </CardTitle>
        <CardDescription>Your scheduled sessions and events</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center p-3 border border-border rounded-md bg-background hover:bg-accent/10 transition-colors"
              >
                <div className="mr-4 p-2 bg-[#B87333]/10 rounded-full">
                  {appointment.type === "video" ? (
                    <Video className="h-4 w-4 text-[#B87333]" />
                  ) : (
                    <Clock className="h-4 w-4 text-[#B87333]" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{appointment.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • {appointment.time}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#B87333]/20 hover:border-[#B87333]/60 hover:bg-[#B87333]/5"
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No upcoming appointments</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-[#B87333]/20 hover:border-[#B87333]/60 hover:bg-[#B87333]/5"
            >
              Schedule Now
            </Button>
          </div>
        )}
        <div className="mt-3 text-center">
          <Button
            variant="link"
            className="text-sm text-[#B87333] hover:text-[#A56625]"
          >
            View All Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
