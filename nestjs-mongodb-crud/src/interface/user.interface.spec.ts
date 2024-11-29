import { IUser } from './user.interface';

describe('IUser Interface', () => {
    it('should have required properties', () => {
        const user: IUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        } as IUser;

        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.password).toBe('password123');
    });

    it('should allow optional properties', () => {
        const user: IUser = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
            location: 'New York',
            phone: '123-456-7890',
            profilePicture: 'profile.jpg',
            typeUser: {
                role: 'helper',
                mobilityNeeds: 'wheelchair',
                preferences: 'quiet places',
            },
        } as IUser;

        expect(user.location).toBe('New York');
        expect(user.phone).toBe('123-456-7890');
        expect(user.profilePicture).toBe('profile.jpg');
        expect(user.typeUser?.role).toBe('helper');
        expect(user.typeUser?.mobilityNeeds).toBe('wheelchair');
        expect(user.typeUser?.preferences).toBe('quiet places');
    });

    it('should allow typeUser to be undefined', () => {
        const user: IUser = {
            name: 'John Smith',
            email: 'john.smith@example.com',
            password: 'password123',
        } as IUser;

        expect(user.typeUser).toBeUndefined();
    });
});