export default interface Status {
    getValue(): string;
    request(): Status;
    accept(): Status;
    start(): Status;
    end(): Status;
}

export class StatusRequested implements Status {
    private value: 'requested' = 'requested';

    getValue(): string {
        return this.value;
    }
    request(): Status {
        throw new Error('Invalid state.');
    }
    accept(): Status {
        return new StatusAccepted();
    }
    start(): Status {
        throw new Error('Invalid state.');
    }
    end(): Status {
        throw new Error('Invalid state.');
    }
}

export class StatusAccepted implements Status {
    private value: 'accepted' = 'accepted';

    getValue(): string {
        return this.value;
    }
    request(): Status {
        throw new Error('Invalid state.');
    }
    accept(): Status {
        throw new Error('Invalid state.');
    }
    start(): Status {
        return new StatusInProgress();
    }
    end(): Status {
        throw new Error('Invalid state.');
    }
}

export class StatusInProgress implements Status {
    private value: 'in_progress' = 'in_progress';

    getValue(): string {
        return this.value;
    }
    request(): Status {
        throw new Error('Invalid state.');
    }
    accept(): Status {
        throw new Error('Invalid state.');
    }
    start(): Status {
        throw new Error('Invalid state.');
    }
    end(): Status {
        return new StatusCompleted();
    }
}

export class StatusCompleted implements Status {
    private value: 'completed' = 'completed';

    getValue(): string {
        return this.value;
    }
    request(): Status {
        throw new Error('Invalid state.');
    }
    accept(): Status {
        throw new Error('Invalid state.');
    }
    start(): Status {
        throw new Error('Invalid state.');
    }
    end(): Status {
        throw new Error('Invalid state.');
    }
}

export class StatusFactory {
    static create(status: 'requested' | 'accepted' | 'in_progress' | 'completed'): Status {
        if (status === 'requested') return new StatusRequested();
        else if (status === 'accepted') return new StatusAccepted();
        else if (status === 'in_progress') return new StatusInProgress();
        else return new StatusCompleted();
    }
}
