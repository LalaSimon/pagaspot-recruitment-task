import { THEME_BLUE } from "@/constants/Colors";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import dayjs, { DateType, DayFormat } from "@/utils/dateUtils";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { CalendarDay } from "./CalendarDay";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarSelectedDay } from "./CalendarSelectedDay";
import { StatusBanner } from "./StatusBanner";

interface WeekViewProps {
  from: DateType;
  offerDays: string[];
  orderDays: string[];
}

interface MonthDay {
  day: string;
  date: string;
  today: boolean;
  offer: boolean;
  order: boolean;
  isCurrentMonth: boolean;
}

export { DayFormat };

export default function MonthView({
  from,
  orderDays,
  offerDays,
}: WeekViewProps) {
  const [width, setWidth] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<DateType>(dayjs(from));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    isSuccess: isOrderCreated,
    isError: isOrderError,
    reset: resetOrderState,
  } = useCreateOrder();

  const monthStart = dayjs(currentMonth).startOf("month");
  const monthEnd = dayjs(currentMonth).endOf("month");

  const firstMonday = dayjs(monthStart).startOf("week");
  const lastSunday = dayjs(monthEnd).endOf("week");

  const day = dayjs(firstMonday);
  const days: MonthDay[] = [];
  let currentDay = day;

  while (currentDay.isSameOrBefore(lastSunday)) {
    days.push({
      day: currentDay.format("DD"),
      date: currentDay.format(DayFormat),
      today: currentDay.isSame(dayjs(), "day"),
      offer: offerDays.includes(currentDay.format(DayFormat)),
      order: orderDays.includes(currentDay.format(DayFormat)),
      isCurrentMonth: currentDay.isSame(currentMonth, "month"),
    });

    currentDay = currentDay.add(1, "day");
  }

  const weeks: MonthDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const weekDayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"];

  const handleDayPress = (date: string) => {
    if (selectedDay === date) {
      setSelectedDay(null);
    } else {
      const dayData = days.find((d) => d.date === date);
      if (dayData?.offer) {
        setSelectedDay(date);
      }
    }
    resetOrderState();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
    resetOrderState();
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
    resetOrderState();
  };

  const handleCreateOrder = (date: DateType) => {
    createOrder(date);
  };

  return (
    <View
      style={styles.days}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <View style={styles.weekHeader}>
        {weekDayNames.map((dayName) => (
          <View
            key={dayName}
            style={{
              width: width / 7,
              padding: 2,
            }}
          >
            <ThemedText style={styles.weekDayName}>{dayName[0]}</ThemedText>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <View key={`week-${week[0]?.date || weekIndex}`} style={styles.weekRow}>
          {week.map((d) => (
            <CalendarDay
              key={d.date}
              day={d}
              width={width}
              selectedDay={selectedDay}
              onDayPress={handleDayPress}
            />
          ))}
        </View>
      ))}

      {/* Selected day section */}
      {selectedDay && (
        <CalendarSelectedDay
          selectedDay={selectedDay}
          isCreatingOrder={isCreatingOrder}
          onCreateOrder={handleCreateOrder}
        />
      )}

      {/* Status banners */}
      <StatusBanner
        type="success"
        message="Zamówienie zostało utworzone pomyślnie"
        visible={isOrderCreated && !isCreatingOrder}
      />

      <StatusBanner
        type="error"
        message="Wystąpił błąd podczas tworzenia zamówienia"
        visible={isOrderError && !isCreatingOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  days: {
    marginVertical: 2,
    marginHorizontal: 2,
    alignSelf: "stretch",
  },
  weekHeader: {
    flexDirection: "row",
  },
  weekRow: {
    flexDirection: "row",
  },
  weekDayName: {
    textAlign: "center",
    color: THEME_BLUE,
    fontFamily: "poppins-bold",
    textTransform: "uppercase",
    fontSize: 10,
  },
});
