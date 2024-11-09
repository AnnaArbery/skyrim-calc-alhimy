# О каулькуляторе алхимии

Скрипт созданный на react для игры Skyrim

### Решает 2 типа задач:

- Кач алхимии - из определенного имеющегося набора ингредиентов подобрать зелья
- Создание полезных зелий с нужными полезными/ядовитыми эффектами

### Особенности кода:

- Без использования create-react-app - только react и точно настроенный webpack
- Из библиотек - mobx, mobx-react-lite, react-router-dom
- Все данные хранятся в json-файлах

### Переменные окружени

URL_COMPONENTS="./store/props.json"  
URL_PROPS="./store/props.json"  
URL_NOTES="./store/notes.json"

### Доработки

./src/pages/Notes.tsx - типизация (prev)  
./src/hooks/useFetch.ts - типизация ([] - argument of type 'undefined[]' is not assignable to parameter of type 'T | (() => T)'.)  
./src/pages/Lists.tsx - типизация (List,Item)  
./src/hooks/useSaveFormula.ts - типизация (prev)
./src/hooks/useHoverDropdown.ts - типизация (dropdown.id)  
./src/hooks/useFilterList.ts - типизация(name - Type 'unknown' cannot be used as an index type.t)
