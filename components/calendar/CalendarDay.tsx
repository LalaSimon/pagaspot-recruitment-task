import { Pressable, StyleSheet, View } from "react-native";
import { THEME_BLUE } from "../../constants/Colors";
import { ThemedText } from "../ThemedText";

interface MonthDay {
  day: string;
  date: string;
  today: boolean;
  offer: boolean;
  order: boolean;
  isCurrentMonth: boolean;
}

interface CalendarDayProps {
  day: MonthDay;
  width: number;
  selectedDay: string | null;
  onDayPress: (date: string) => void;
}

export const CalendarDay = ({
  day: d,
  width,
  selectedDay,
  onDayPress,
}: CalendarDayProps) => {
  return (
    <View
      style={{
        ...{
          width: width / 7,
          padding: 1,
        },
      }}
      key={d.date}
    >
      <Pressable
        style={{
          ...styles.touchableBox,
          ...(d.offer || !d.isCurrentMonth ? {} : styles.noOfferDay),
          ...(d.isCurrentMonth ? {} : styles.otherMonthDay),
          ...(d.today && d.isCurrentMonth ? styles.todayBackground : {}),
        }}
        onPress={() => onDayPress(d.date)}
      >
        <View
          style={{
            ...styles.dayBox,
            ...(selectedDay === d.date ? { backgroundColor: THEME_BLUE } : {}),
          }}
        >
          {d.isCurrentMonth && (
            <ThemedText
              style={{
                ...styles.dayText,
                ...(d.today ? { fontWeight: "bold", color: THEME_BLUE } : {}),
                ...(d.isCurrentMonth ? {} : styles.otherMonthText),
                ...(selectedDay === d.date
                  ? { fontWeight: "bold", color: "#fff" }
                  : {}),
              }}
            >
              {d.day}
            </ThemedText>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableBox: {
    backgroundColor: "#f6f6f6",
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f6f6f6",
    justifyContent: "center",
  },
  dayBox: {
    justifyContent: "center",
    marginHorizontal: 0,
    width: "100%",
    height: "100%",
  },
  dayText: {
    textAlign: "center",
    fontSize: 13,
  },
  noOfferDay: {
    opacity: 0.4,
  },
  otherMonthDay: {
    backgroundColor: "#f0f0f0",
    borderColor: "#f0f0f0",
    opacity: 0.4,
  },
  otherMonthText: {
    color: "#ccc",
  },
  todayBackground: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: THEME_BLUE,
  },
});
