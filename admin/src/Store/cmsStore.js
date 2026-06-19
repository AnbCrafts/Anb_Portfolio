import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as projectApi from '../Api/project.api'
import * as storyApi from '../Api/story.api'
import * as skillApi from '../Api/skill.api'
import * as experienceApi from '../Api/experience.api'
import * as certApi from '../Api/certificate.api'
import * as testimonialApi from '../Api/testimonial.api'
import * as contactApi from '../Api/contact.api'
import * as settingsApi from '../Api/settings.api'
import * as mediaApi from '../Api/media.api'
import * as dashboardApi from '../Api/dashboard.api'
import * as resumeApi from '../Api/resume.api'

// --- Generic CRUD Thunk Factory ---
// Keeps repeated async logic DRY across all CMS sections using the clean API layer

const buildCrudThunks = (name, { getAll, create, update, remove }) => ({
  fetchAll: createAsyncThunk(`cms/${name}/fetchAll`, async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getAll({ includeDrafts: true, ...params })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name}`)
    }
  }),

  create: createAsyncThunk(`cms/${name}/create`, async (payload, { rejectWithValue }) => {
    try {
      const response = await create(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to create ${name}`)
    }
  }),

  update: createAsyncThunk(`cms/${name}/update`, async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await update(id, payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to update ${name}`)
    }
  }),

  remove: createAsyncThunk(`cms/${name}/remove`, async (id, { rejectWithValue }) => {
    try {
      await remove(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to delete ${name}`)
    }
  }),
})

// --- Thunks for all CMS modules ---

export const projectThunks     = buildCrudThunks('projects', {
  getAll: projectApi.getAllProjects,
  create: projectApi.createProject,
  update: projectApi.updateProject,
  remove: projectApi.deleteProject
})

export const storyThunks       = buildCrudThunks('stories', {
  getAll: storyApi.getAllStories,
  create: storyApi.createStory,
  update: storyApi.updateStory,
  remove: storyApi.deleteStory
})

export const skillThunks       = buildCrudThunks('skills', {
  getAll: skillApi.getAllSkills,
  create: skillApi.createSkill,
  update: skillApi.updateSkill,
  remove: skillApi.deleteSkill
})

export const experienceThunks  = buildCrudThunks('experience', {
  getAll: experienceApi.getAllExperiences,
  create: experienceApi.createExperience,
  update: experienceApi.updateExperience,
  remove: experienceApi.deleteExperience
})

export const certThunks        = buildCrudThunks('certificates', {
  getAll: certApi.getAllCertificates,
  create: certApi.createCertificate,
  update: certApi.updateCertificate,
  remove: certApi.deleteCertificate
})

export const testimonialThunks = buildCrudThunks('testimonials', {
  getAll: testimonialApi.getAllTestimonials,
  create: testimonialApi.createTestimonial,
  update: testimonialApi.updateTestimonial,
  remove: testimonialApi.deleteTestimonial
})

export const resumeThunks      = buildCrudThunks('resumes', {
  getAll: resumeApi.getAllResumes,
  create: resumeApi.createResume,
  update: resumeApi.updateResume,
  remove: resumeApi.deleteResume
})

// Contact has a different update (status only)
export const fetchContacts = createAsyncThunk('cms/contacts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await contactApi.getAllContacts()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts')
  }
})

export const updateContactStatus = createAsyncThunk(
  'cms/contacts/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await contactApi.updateContactStatus(id, status)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status')
    }
  }
)

export const deleteContact = createAsyncThunk(
  'cms/contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await contactApi.deleteContact(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete contact')
    }
  }
)

// Settings (single document)
export const fetchSettings = createAsyncThunk('cms/settings/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await settingsApi.getSettings()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch settings')
  }
})

export const updateSettings = createAsyncThunk('cms/settings/update', async (payload, { rejectWithValue }) => {
  try {
    const response = await settingsApi.updateSettings(payload)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update settings')
  }
})

// Media Library
export const fetchMedia = createAsyncThunk('cms/media/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await mediaApi.getAllMedia()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch media')
  }
})

export const uploadMedia = createAsyncThunk('cms/media/upload', async (formData, { rejectWithValue }) => {
  try {
    const response = await mediaApi.uploadMedia(formData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Upload failed')
  }
})

export const deleteMedia = createAsyncThunk('cms/media/delete', async (id, { rejectWithValue }) => {
  try {
    await mediaApi.deleteMedia(id)
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete media')
  }
})

// Dashboard
export const fetchDashboardAnalytics = createAsyncThunk('cms/dashboard/analytics', async (_, { rejectWithValue }) => {
  try {
    const response = await dashboardApi.getDashboardAnalytics()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics')
  }
})

// --- Helper: build reducers for a CRUD section ---

const buildCrudReducers = (thunks, key) => ({
  [thunks.fetchAll.pending]: (state) => { state[key].loading = true; state[key].error = null },
  [thunks.fetchAll.fulfilled]: (state, action) => { state[key].loading = false; state[key].items = action.payload },
  [thunks.fetchAll.rejected]: (state, action) => { state[key].loading = false; state[key].error = action.payload },

  [thunks.create.pending]: (state) => { state[key].submitting = true },
  [thunks.create.fulfilled]: (state, action) => { state[key].submitting = false; state[key].items.unshift(action.payload) },
  [thunks.create.rejected]: (state, action) => { state[key].submitting = false; state[key].error = action.payload },

  [thunks.update.pending]: (state) => { state[key].submitting = true },
  [thunks.update.fulfilled]: (state, action) => {
    state[key].submitting = false
    const idx = state[key].items.findIndex(i => i._id === action.payload._id)
    if (idx !== -1) state[key].items[idx] = action.payload
  },
  [thunks.update.rejected]: (state, action) => { state[key].submitting = false; state[key].error = action.payload },

  [thunks.remove.pending]: (state) => { state[key].submitting = true },
  [thunks.remove.fulfilled]: (state, action) => {
    state[key].submitting = false
    state[key].items = state[key].items.filter(i => i._id !== action.payload)
  },
  [thunks.remove.rejected]: (state, action) => { state[key].submitting = false; state[key].error = action.payload },
})

// --- Initial State ---

const sectionState = () => ({ items: [], loading: false, submitting: false, error: null })

const initialState = {
  projects:     sectionState(),
  stories:      sectionState(),
  skills:       sectionState(),
  experience:   sectionState(),
  certificates: sectionState(),
  testimonials: sectionState(),
  resumes:      sectionState(),
  contacts:     sectionState(),
  media:        sectionState(),
  settings:     { data: null, loading: false, submitting: false, error: null },
  dashboard:    { data: null, loading: false, error: null },
}

// --- CMS Slice ---

const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    clearSectionError: (state, action) => {
      const section = action.payload
      if (state[section]) state[section].error = null
    },
  },
  extraReducers: (builder) => {
    // Projects
    Object.entries(buildCrudReducers(projectThunks, 'projects')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })
    // Stories
    Object.entries(buildCrudReducers(storyThunks, 'stories')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })
    // Skills
    Object.entries(buildCrudReducers(skillThunks, 'skills')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })
    // Experience
    Object.entries(buildCrudReducers(experienceThunks, 'experience')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })
    // Certificates
    Object.entries(buildCrudReducers(certThunks, 'certificates')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })
    // Testimonials
    Object.entries(buildCrudReducers(testimonialThunks, 'testimonials')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })
    // Resumes
    Object.entries(buildCrudReducers(resumeThunks, 'resumes')).forEach(([type, handler]) => {
      builder.addCase(type, handler)
    })

    // Contacts
    builder
      .addCase(fetchContacts.pending, (state) => { state.contacts.loading = true })
      .addCase(fetchContacts.fulfilled, (state, action) => { state.contacts.loading = false; state.contacts.items = action.payload })
      .addCase(fetchContacts.rejected, (state, action) => { state.contacts.loading = false; state.contacts.error = action.payload })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        const idx = state.contacts.items.findIndex(c => c._id === action.payload._id)
        if (idx !== -1) state.contacts.items[idx] = action.payload
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(c => c._id !== action.payload)
      })

    // Settings
    builder
      .addCase(fetchSettings.pending, (state) => { state.settings.loading = true })
      .addCase(fetchSettings.fulfilled, (state, action) => { state.settings.loading = false; state.settings.data = action.payload })
      .addCase(fetchSettings.rejected, (state, action) => { state.settings.loading = false; state.settings.error = action.payload })
      .addCase(updateSettings.pending, (state) => { state.settings.submitting = true })
      .addCase(updateSettings.fulfilled, (state, action) => { state.settings.submitting = false; state.settings.data = action.payload })
      .addCase(updateSettings.rejected, (state, action) => { state.settings.submitting = false; state.settings.error = action.payload })

    // Media
    builder
      .addCase(fetchMedia.pending, (state) => { state.media.loading = true })
      .addCase(fetchMedia.fulfilled, (state, action) => { state.media.loading = false; state.media.items = action.payload })
      .addCase(fetchMedia.rejected, (state, action) => { state.media.loading = false; state.media.error = action.payload })
      .addCase(uploadMedia.pending, (state) => { state.media.submitting = true })
      .addCase(uploadMedia.fulfilled, (state, action) => { state.media.submitting = false; state.media.items.unshift(action.payload) })
      .addCase(uploadMedia.rejected, (state, action) => { state.media.submitting = false; state.media.error = action.payload })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.media.items = state.media.items.filter(m => m._id !== action.payload)
      })

    // Dashboard
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => { state.dashboard.loading = true })
      .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => { state.dashboard.loading = false; state.dashboard.data = action.payload })
      .addCase(fetchDashboardAnalytics.rejected, (state, action) => { state.dashboard.loading = false; state.dashboard.error = action.payload })
  },
})

export const { clearSectionError } = cmsSlice.actions
export default cmsSlice.reducer

