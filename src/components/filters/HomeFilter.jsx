import { useState, useMemo } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function HomeFilter({ filter, selectedFilters, setSelectedFilters, i, label }) {
  const [open, setOpen] = useState(false);

  const maxOptionLength = useMemo(() => {
    return Math.max(
      label.length,
      ...filter.options.map((opt) => opt.length)
    );
  }, [filter.options, label]);

  const minWidth = maxOptionLength * 10;

  const handleSelect = (value) => {
    const newFilters = [...selectedFilters];
    newFilters[i] = value;
    setSelectedFilters(newFilters);
    setOpen(false);
  };

  const isActive = selectedFilters[i] !== "Tous";

  return (
    <View style={{ alignSelf: "flex-start" }}>
      <TouchableOpacity
        style={[
          styles.filter,
          isActive && styles.activeFilter,
          { alignSelf: "flex-start", marginRight: 8, minWidth },
        ]}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.7}
      >
        <Text style={{ color: isActive ? "#fff" : "#888" }}>
          {selectedFilters[i] === "Tous" ? label : selectedFilters[i]}
        </Text>
      </TouchableOpacity>
      {open && (
        <View style={[styles.dropdown, { minWidth }]}>
          {filter.options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option)}
            >
              <Text style={{ color: "#444" }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: "#444",
    color: "#fff",
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    zIndex: 200, // augmente la valeur si besoin
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default HomeFilter;