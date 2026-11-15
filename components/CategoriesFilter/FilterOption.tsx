import css from './FilterOptions.module.css';

type FilterOptionProps = {
  type: 'checkbox' | 'radio';
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function FilterOption({ type, name, label, checked, onChange }: FilterOptionProps) {
  return (
    <li>
      <label className={css.option}>
        <input
          className={css.input}
          type={type}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    </li>
  );
}
