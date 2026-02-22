import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";

export interface OptionType {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: OptionType[];
  value: OptionType[];
  onChange: (value: OptionType[]) => void;
  placeholder?: string;
}

// 🎨 DaisyUI Dark Theme Compatible Styles
const customStyles: StylesConfig<OptionType, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    minHeight: "42px",
    boxShadow: "none",
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "#111827",
    zIndex: 9999,
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#6366f1" : isFocused ? "#374151" : "#111827",
    color: "white",
    cursor: "pointer",
  }),

  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#6366f1",
  }),

  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),

  multiValueRemove: (styles) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "#4f46e5",
      color: "white",
    },
  }),

  placeholder: (styles) => ({
    ...styles,
    color: "#9ca3af",
  }),

  input: (styles) => ({
    ...styles,
    color: "white",
  }),
};

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) => {
  const handleChange = (selected: readonly OptionType[] | null) => {
    // 🚫 Prevent duplicate skills
    const unique = selected
      ? [...new Map(selected.map((i) => [i.value.toLowerCase(), i])).values()]
      : [];

    onChange(unique);
  };

  return (
    <CreatableSelect
      isMulti
      isClearable
      options={options}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      closeMenuOnSelect={false}
      styles={customStyles}
      formatCreateLabel={(input) => `Add "${input}"`}
    />
  );
};

export default MultiSelect;
