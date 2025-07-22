
type FormattedCurrencyProps = {
    amount: number;
    currencyCode: string;
    locale: string;
};

const FormattedCurrency = ({ amount, currencyCode, locale }: FormattedCurrencyProps) => {
    const formattedAmount = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);

    return <span>{formattedAmount}</span>;
};

export default FormattedCurrency;
