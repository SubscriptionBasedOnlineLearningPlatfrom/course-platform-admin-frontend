const ADMIN_TOKEN_KEY = "adminToken";
const LEGACY_TOKEN_KEY = "token";
const ADMIN_USER_KEY = "adminUser";

const isBrowser = () => typeof window !== "undefined";

const getStorage = (type) => {
  if (!isBrowser()) return null;
  try {
    return window[type];
  } catch (error) {
    console.warn(`Unable to access ${type}:`, error);
    return null;
  }
};

const syncLegacyToken = (token) => {
  const local = getStorage("localStorage");
  const session = getStorage("sessionStorage");

  if (!token) return;

  local?.setItem(LEGACY_TOKEN_KEY, token);
  session?.setItem(LEGACY_TOKEN_KEY, token);
};

export const getAdminToken = () => {
  const local = getStorage("localStorage");
  const session = getStorage("sessionStorage");

  let token = local?.getItem(ADMIN_TOKEN_KEY) || session?.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    token = local?.getItem(LEGACY_TOKEN_KEY) || session?.getItem(LEGACY_TOKEN_KEY);
    if (token) {
      // migrate legacy token into new key for consistency
      local?.setItem(ADMIN_TOKEN_KEY, token);
      syncLegacyToken(token);
    }
  }

  return token;
};

export const setAdminAuth = ({ token, admin, remember = true }) => {
  const local = getStorage("localStorage");
  const session = getStorage("sessionStorage");

  if (!token) return;

  const targetStorage = remember ? local : session;
  const backupStorage = remember ? session : local;

  targetStorage?.setItem(ADMIN_TOKEN_KEY, token);
  backupStorage?.setItem(ADMIN_TOKEN_KEY, token);
  syncLegacyToken(token);

  if (admin) {
    local?.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
  }
};

export const clearAdminAuth = () => {
  const local = getStorage("localStorage");
  const session = getStorage("sessionStorage");

  [local, session].forEach((storage) => {
    storage?.removeItem(ADMIN_TOKEN_KEY);
    storage?.removeItem(LEGACY_TOKEN_KEY);
    storage?.removeItem(ADMIN_USER_KEY);
  });
};

export const getAdminUser = () => {
  const local = getStorage("localStorage");
  const session = getStorage("sessionStorage");

  const user = local?.getItem(ADMIN_USER_KEY) || session?.getItem(ADMIN_USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.warn("Failed to parse admin user from storage", error);
    return null;
  }
};

export const dispatchAdminAuthChange = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event("admin-auth-change"));
};
