
export const validateSortNumber = (_, value) => {
    if (!Number.isInteger(value)) {
        return Promise.reject(new Error("Поле \"Порядковий номер\" може містити тільки цифри"));
    }
    const valueLength = value.toString().length;
    if (valueLength < 5 || valueLength > 30) {
        return Promise.reject(new Error("Поле \"Порядковий номер\" може містити мінімум 5, максимум 30 символів"
        ))
            ;
    }
    return Promise.resolve();
};