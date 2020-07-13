export function isPastDate(val) {
    let today = new Date();
    try {
        let received = new Date(Date.parse(val));
        return received < today ? true: false;
    } catch (error) {
        return false;
    }
}