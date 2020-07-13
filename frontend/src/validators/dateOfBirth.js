export function isPastDate(val) {

    if (!val) return true;

    let today = new Date();
    try {
        let received = new Date(Date.parse(val));
        return received < today ? true : false;
    } catch (error) {
        return false;
    }
}