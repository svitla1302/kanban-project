'use client';

import { useLocale } from 'next-intl';

interface CaptionType {
  caption: string
}

export default function LangSwitcher({ caption }: CaptionType) {
  const currentLocale = useLocale();
 
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    window.location.reload();
  }
  return (
    <label>
      <span>{caption}</span>
      <select
        value={currentLocale}
        onChange={onSelectChange}
      >
        <option value="en">English</option>
        <option value="uk">Українська</option>
      </select>
    </label>
  );
}
