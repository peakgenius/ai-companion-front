import React from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const Select = (props) => {
  const { dropdownHeight, data, onSelect, defaultValue } = props;

  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      dropdownStyle={{...styles.dropdownStyle, height: dropdownHeight}}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
      selectedRowTextStyle={{color: 'black'}}
      defaultValue={defaultValue}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#cbd5e1",
    color: "#828d9c",
  },
  buttonTextStyle: {
    fontSize: 16,
    textAlign:'left'
  },
  rowStyle: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowTextStyle: {
    color: '#828d9c',
  },
  dropdownStyle: {
    borderRadius: 6,
    marginTop: -22
  }
});

export default Select;
