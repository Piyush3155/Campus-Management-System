import { Card, CardContent } from "@/components/ui/card"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM"]

const timetableData = [
  { day: "Monday", time: "09:00 AM", subject: "Mathematics", room: "101", section: "A" },
  { day: "Monday", time: "02:00 PM", subject: "Computer Science", room: "Lab 1", section: "C" },
  { day: "Tuesday", time: "10:30 AM", subject: "Physics", room: "204", section: "B" },
  { day: "Wednesday", time: "09:00 AM", subject: "Mathematics", room: "101", section: "A" },
  { day: "Thursday", time: "10:30 AM", subject: "Physics", room: "204", section: "B" },
  { day: "Thursday", time: "02:00 PM", subject: "Computer Science", room: "Lab 1", section: "C" },
  { day: "Friday", time: "09:00 AM", subject: "Mathematics", room: "101", section: "A" },
]

export function ClassTimetable() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 border-b bg-muted/30">
          <div className="p-4 font-semibold text-center border-r">Time</div>
          {days.map((day) => (
            <div key={day} className="p-4 font-semibold text-center border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        {timeSlots.map((slot) => (
          <div key={slot} className="grid grid-cols-6 border-b last:border-b-0">
            <div className="p-4 text-sm font-medium text-center bg-muted/10 border-r">{slot}</div>
            {days.map((day) => {
              const session = timetableData.find((d) => d.day === day && d.time === slot)
              return (
                <div key={`${day}-${slot}`} className="p-2 border-r last:border-r-0 min-h-[100px]">
                  {session ? (
                    <Card className="h-full bg-blue-50/50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 shadow-sm">
                      <CardContent className="p-3">
                        <p className="text-sm font-bold text-blue-700 dark:text-blue-300">{session.subject}</p>
                        <p className="text-[10px] text-blue-600/70 dark:text-blue-400">Class: {session.section}</p>
                        <p className="text-[10px] text-blue-600/70 dark:text-blue-400">Room: {session.room}</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                       <span className="text-[10px] text-muted-foreground/30">---</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
