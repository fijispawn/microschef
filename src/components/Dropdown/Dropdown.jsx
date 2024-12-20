import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './Dropdown.module.css'

const Dropdown = ({ options, value, onChange, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === value)

  const handleOptionClick = (option) => {
    onChange({
      target: {
        name: name,
        value: option.value,
      },
    })
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.dropdownHeader} ${
          selectedOption ? styles.filled : styles.placeholder
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
}

Dropdown.defaultProps = {
  value: '',
  placeholder: 'Выберите вариант',
  name: '',
}

export default Dropdown
