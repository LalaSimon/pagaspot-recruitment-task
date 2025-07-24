import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export type StatusBannerType = "success" | "error";

export interface StatusBannerProps {
  type: StatusBannerType;
  message: string;
  visible: boolean;
}

const STATUS_CONFIG = {
  success: {
    backgroundColor: "#28a745",
    icon: "checkmark-circle" as const,
    textColor: "#fff",
  },
  error: {
    backgroundColor: "#dc3545",
    icon: "alert-circle" as const,
    textColor: "#fff",
  },
} as const;

export function StatusBanner({ type, message, visible }: StatusBannerProps) {
  if (!visible) return null;

  const config = STATUS_CONFIG[type];

  return (
    <View
      style={[styles.container, { backgroundColor: config.backgroundColor }]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View style={styles.content}>
        <Ionicons name={config.icon} size={16} color={config.textColor} />
        <Text style={[styles.message, { color: config.textColor }]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    shadowColor: "#000",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontFamily: "poppins-bold",
    textAlign: "center",
  },
});
