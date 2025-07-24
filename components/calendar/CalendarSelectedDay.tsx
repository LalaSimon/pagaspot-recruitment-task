import { THEME_BLUE } from "@/constants/Colors";
import dayjs, { DateType } from "@/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface CalendarSelectedDayProps {
  selectedDay: string;
  isCreatingOrder: boolean;
  onCreateOrder: (date: DateType) => void;
}

export function CalendarSelectedDay({
  selectedDay,
  isCreatingOrder,
  onCreateOrder,
}: CalendarSelectedDayProps) {
  const formattedDate = dayjs(selectedDay).format("DD.MM.YYYY");

  const handleOrderPress = () => {
    onCreateOrder(dayjs(selectedDay));
  };

  return (
    <View>
      <View style={styles.selectedDayInfo}>
        <Ionicons name="calendar-outline" size={16} color="#666" />
        <Text style={styles.selectedDayLabel}>Wybrany dzień:</Text>
        <Text style={styles.selectedDayDate}>{formattedDate}</Text>
      </View>

      <Pressable
        disabled={isCreatingOrder}
        style={({ pressed }) => [
          styles.orderButtonContainer,
          pressed && styles.orderButtonPressed,
          isCreatingOrder && styles.orderButtonDisabled,
        ]}
        onPress={handleOrderPress}
        accessibilityLabel={`Zamów na dzień ${formattedDate}`}
        accessibilityRole="button"
        accessibilityState={{ disabled: isCreatingOrder }}
      >
        <View style={styles.orderButtonContent}>
          <Ionicons
            name={isCreatingOrder ? "hourglass-outline" : "checkmark-circle"}
            size={16}
            color="#fff"
          />
          <Text style={styles.orderButton}>
            {isCreatingOrder ? "Zamawiam..." : "Zamów"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedDayInfo: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderLeftWidth: 4,
    borderLeftColor: "#ff6b35",
  },
  selectedDayLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "poppins-regular",
  },
  selectedDayDate: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#333",
  },
  orderButtonContainer: {
    backgroundColor: THEME_BLUE,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 8,
    minWidth: 140,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: "#000",
  },
  orderButtonPressed: {
    transform: [{ scale: 0.95 }],
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  orderButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  orderButton: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#fff",
    textAlign: "center",
  },
  orderButtonDisabled: {
    opacity: 0.5,
  },
});
