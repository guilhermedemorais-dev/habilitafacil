
import { User, UserRole } from '../types';

/**
 * Mocks a login API call.
 * In a real app, this would use fetch/axios to call API_ENDPOINTS.LOGIN.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {UserRole} role - The user's selected role.
 * @returns {Promise<User>} A promise that resolves to the user object.
 */
export const login = (email: string, password: string, role: UserRole): Promise<User> => {
  console.log(`Simulating login for ${email} as ${role}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes('@') && password.length > 0) {
        resolve({
          id: `user-${Date.now()}`,
          name: role === UserRole.ADMIN ? 'Admin User' : (role === UserRole.INSTRUCTOR ? 'Instrutor Silva' : 'Aluno Souza'),
          email: email,
          role: role,
          avatarUrl: 'https://picsum.photos/100',
          token: 'mock-jwt-token-string'
        });
      } else {
        reject(new Error('Credenciais inválidas.'));
      }
    }, 1000);
  });
};

/**
 * Mocks a registration API call.
 * In a real app, this would use fetch/axios to call API_ENDPOINTS.REGISTER.
 * @param {any} data - The registration form data.
 * @returns {Promise<User>} A promise that resolves to the newly created user object.
 */
export const register = (data: any): Promise<User> => {
    console.log(`Simulating registration for ${data.email} as ${data.role}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email.includes('@')) {
                resolve({
                    id: `user-${Date.now()}`,
                    name: data.name,
                    email: data.email,
                    role: data.role as UserRole,
                    avatarUrl: 'https://picsum.photos/100',
                    token: 'mock-jwt-token-string'
                });
            } else {
                reject(new Error('Erro no cadastro. Verifique os dados.'));
            }
        }, 1500);
    });
};
