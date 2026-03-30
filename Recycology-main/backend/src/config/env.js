const DEFAULT_JWT_SECRET = 'local-dev-secret-change-me';

export const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    console.warn(
      'JWT_SECRET is not set. Falling back to an insecure local development secret.'
    );
  }

  return process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
};
