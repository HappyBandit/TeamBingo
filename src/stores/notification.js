import { observable, action } from 'mobx';

class notificationStore {
    @observable notification = {};

    @action error (message) {
        this.notification = {
            message,
            title: 'Error',
            level: 'error',
        };
    }

    @action success (message) {
        this.notification = {
            message,
            title: 'Success',
            level: 'success',
        };
    }

    @action warning (message) {
        this.notification = {
            message,
            title: 'Warning',
            level: 'warning ',
        };
    }

    @action info (message) {
        this.notification = {
            message,
            title: 'Info',
            level: 'info ',
        };
    }

    @action remove () {
        this.notification = {};
    }
}

export default notificationStore;
