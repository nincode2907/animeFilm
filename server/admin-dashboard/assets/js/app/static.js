const calculationTimeDiff = (timeNotify) => {
    const now = new Date();
    const timeDiff = now.getTime() - timeNotify.getTime();

    const timeUnits = [
        { unit: 'year', value: 12 * 30 * 24 * 60 * 60 * 1000 },
        { unit: 'month', value: 30 * 24 * 60 * 60 * 1000 },
        { unit: 'day', value: 24 * 60 * 60 * 1000 },
        { unit: 'hour', value: 60 * 60 * 1000 },
        { unit: 'minute', value: 60 * 1000 },
        { unit: 'second', value: 1000 }
    ];

    for (const { unit, value } of timeUnits) {
        if (timeDiff >= value) {
            const diff = Math.floor(timeDiff / value);
            return `${diff} ${unit}${diff > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
};


// Toaster
const toast = document.getElementById("successToast");
const errToast = document.getElementById("dangerToast");
const notifications = document.getElementById('notify-list');


const showToast = () => {
    toast.classList.add("show");
    toast.classList.remove("fade");
};

const hideToast = () => {
    toast.classList.add("fade");
    toast.classList.remove("show");
};

const showErrToast = () => {
    errToast.classList.add("show");
    errToast.classList.remove("fade");
};

const hideErrToast = () => {
    errToast.classList.add("fade");
    errToast.classList.remove("show");
};

// replace to lower case and replace vietnamese characters
const replaceToLowerCase = (str) => {
    return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};