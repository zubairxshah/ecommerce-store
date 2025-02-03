export function formatCurrecy(
    amount : number,
    currencyCode : string = "USD",
) : string {

    try{
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
        });

        return formatter.format(amount);
    } catch(error){
        console.error("Error formatting currency:", error);
        return `${currencyCode} ${amount.toFixed(2)}`;
    }
    
}