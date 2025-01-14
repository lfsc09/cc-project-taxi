import { StatusAccepted, StatusCompleted, StatusInProgress, StatusRequested } from '../../src/core/vo/Ride/Status';

describe('VO: Ride Status', () => {
    it('Should validate a "StatusRequested"', () => {
        const state = new StatusRequested();
        expect(state.getValue()).toBe('requested');
        const nextState = state.accept();
        expect(nextState.getValue()).toBe('accepted');
    });

    it('Should validate a "StatusAccepted"', () => {
        const state = new StatusAccepted();
        expect(state.getValue()).toBe('accepted');
        const nextState = state.start();
        expect(nextState.getValue()).toBe('in_progress');
    });

    it('Should validate a "StatusInProgress"', () => {
        const state = new StatusInProgress();
        expect(state.getValue()).toBe('in_progress');
        const nextState = state.end();
        expect(nextState.getValue()).toBe('completed');
    });

    it('Should validate a "StatusCompleted"', () => {
        const state = new StatusCompleted();
        expect(state.getValue()).toBe('completed');
    });

    it('Should not validate a "StatusRequested" entering Invalid states', () => {
        expect(() => new StatusRequested().request()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusRequested().start()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusRequested().end()).toThrow(new Error('Invalid state.'));
    });

    it('Should not validate a "StatusAccepted" entering Invalid states', () => {
        expect(() => new StatusAccepted().request()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusAccepted().accept()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusAccepted().end()).toThrow(new Error('Invalid state.'));
    });

    it('Should not validate a "StatusInProgress" entering Invalid states', () => {
        expect(() => new StatusInProgress().request()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusInProgress().accept()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusInProgress().start()).toThrow(new Error('Invalid state.'));
    });

    it('Should not validate a "StatusCompleted" entering Invalid states', () => {
        expect(() => new StatusCompleted().request()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusCompleted().accept()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusCompleted().start()).toThrow(new Error('Invalid state.'));
        expect(() => new StatusCompleted().end()).toThrow(new Error('Invalid state.'));
    });
});
