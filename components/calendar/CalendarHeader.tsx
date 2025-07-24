import { THEME_BLUE, THEME_LIGHT_BLUE } from "@/constants/Colors";
import { DateType } from "@/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface CalendarHeaderProps {
  currentMonth: DateType;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  const formatMonthYear = (month: DateType): string => {
    const formatted = month.format("MMMM YYYY");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
  };

  return (
    <View style={styles.dateChangeContainer}>
      <Pressable
        style={styles.dateChangeButton}
        onPress={onPreviousMonth}
        accessibilityLabel="Poprzedni miesiąc"
        accessibilityRole="button"
      >
        <Ionicons name="chevron-back" size={18} color="#fff" />
      </Pressable>

      <Text style={styles.dateChangeText}>{formatMonthYear(currentMonth)}</Text>

      <Pressable
        style={styles.dateChangeButton}
        onPress={onNextMonth}
        accessibilityLabel="Następny miesiąc"
        accessibilityRole="button"
      >
        <Ionicons name="chevron-forward" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dateChangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 10,
  },
  dateChangeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: THEME_LIGHT_BLUE,
    borderWidth: 1,
    borderColor: THEME_BLUE,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    shadowColor: "#000",
  },
  dateChangeText: {
    flex: 0.6,
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#000",
    textAlign: "center",
  },
});
