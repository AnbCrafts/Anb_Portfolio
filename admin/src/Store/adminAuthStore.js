import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginInit, loginVerify, logout, getProfile, forgotPassword, resetPassword } from '../Api/auth.api'

// --- Async Thunks ---

export const loginAdminInit = createAsyncThunk(
  'adminAuth/loginInit',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginInit(email, password)
      return response // returns { success: true, data: { mfaRequired: true } }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const verifyLoginOtp = createAsyncThunk(
  'adminAuth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await loginVerify(email, otp)
      // Persist token to localStorage
      localStorage.setItem('adminToken', response.data.accessToken)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Verification failed')
    }
  }
)

export const forgotPasswordAdmin = createAsyncThunk(
  'adminAuth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await forgotPassword(email)
      return response.message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP')
    }
  }
)

export const resetPasswordAdmin = createAsyncThunk(
  'adminAuth/resetPassword',
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await resetPassword(email, otp, newPassword)
      return response.message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password')
    }
  }
)

export const fetchAdminProfile = createAsyncThunk(
  'adminAuth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile()
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const logoutAdmin = createAsyncThunk(
  'adminAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout()
      localStorage.removeItem('adminToken')
      return null
    } catch (error) {
      localStorage.removeItem('adminToken')
      return rejectWithValue(error.response?.data?.message || 'Logout failed')
    }
  }
)

// --- Slice ---

const initialState = {
  token: localStorage.getItem('adminToken') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('adminToken'),
  loading: false,
  error: null,
  mfaRequired: false,
  otpSent: false,
  message: null,
}

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
    clearAuthMessage: (state) => {
      state.message = null
    },
    resetMfaState: (state) => {
      state.mfaRequired = false
      state.otpSent = false
    },
    clearAuthLocal: (state) => {
      localStorage.removeItem('adminToken')
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.mfaRequired = false
      state.otpSent = false
    }
  },
  extraReducers: (builder) => {
    // Login Init
    builder
      .addCase(loginAdminInit.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAdminInit.fulfilled, (state, action) => {
        state.loading = false
        state.mfaRequired = action.payload.data?.mfaRequired || false
      })
      .addCase(loginAdminInit.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Verify OTP
    builder
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
        state.isAuthenticated = true
        state.mfaRequired = false
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Forgot Password
    builder
      .addCase(forgotPasswordAdmin.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(forgotPasswordAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.otpSent = true
        state.message = action.payload
      })
      .addCase(forgotPasswordAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Reset Password
    builder
      .addCase(resetPasswordAdmin.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(resetPasswordAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.otpSent = false
        state.message = action.payload
      })
      .addCase(resetPasswordAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Fetch Profile
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        localStorage.removeItem('adminToken')
        state.token = null
        state.isAuthenticated = false
      })

    // Logout
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false
        state.token = null
        state.user = null
        state.isAuthenticated = false
        state.error = null
        state.mfaRequired = false
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false
        state.token = null
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload
      })
  },
})

export const { clearAuthError, clearAuthMessage, resetMfaState, clearAuthLocal } = adminAuthSlice.actions
export default adminAuthSlice.reducer
