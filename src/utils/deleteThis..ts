interface NumericBox<T extends number> {
  value: T;
}

class DataHolder<T> {
  private value: T | undefined;
  setValue(newValue: T): void {
    this.value = newValue;
  }
  getValue(): T | undefined {
    return this.value;
  }
}

type SelectProps<T> = {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
};

type Storagex<T> = {
  data: T;
  timestamp: number;
};

type NumberArray<T extends number[]> = {
  numbers: T;
};

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | { error?: string };

type Form<T extends T[]> = {
  value: T;
  touched: boolean;
  error: string | null;
};
