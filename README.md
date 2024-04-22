# React Key Maker

React Key Maker is a lightweight utility for generating unique keys for objects or items, designed to simplify list rendering in UI components.

## Installation

You can install React Key Maker via npm:

```bash
npm install react-key-maker
```

## Features

- **Auto Key Generation**: Automatically generate unique keys for lists.
- **Customizable Prefix**: Choose a custom prefix to prepend to the keys.
- **Error Handling**: Robust error handling ensures reliability.
- **Reset Functionality**: Easily clear the key generator's state for updates.
- **Optimized Performance**: Efficient rendering even with large datasets.

## Usage

```javascript
import { useAutoKeyMaker } from "react-key-maker";

const dogs = [
  { name: "Caucasian Shepherd Dog", breed: "Molosser" },
  { name: "Labrador Retriever", breed: "Retriever" },
  { name: "German Shepherd", breed: "Herding" },
];

export default function Home() {
  const { keyGen } = useAutoKeyMaker();

  return (
    <div>
      {dogs.map((dog) => (
        <div key={keyGen(dog)}>{dog.name}</div>
      ))}
    </div>
  );
}
```

## Options

When using React Key Maker, you have additional options to tailor the key generation process to your needs.

### Hash

You can choose to hash the keys for added uniqueness and stability across re-renders. This ensures that your keys remain secure and consistent, even in dynamic environments.

```javascript
const { keyGen } = useAutoKeyMaker({ hash: true });
```

### Prefix

Define a custom prefix to prepend to your generated keys. This allows you to personalize your keys and seamlessly integrate them into your project's naming conventions.

```javascript
const { keyGen } = useAutoKeyMaker({ prefix: "prefix" });
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
