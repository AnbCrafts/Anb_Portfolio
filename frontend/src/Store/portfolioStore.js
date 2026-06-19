import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../Api/project.api';
import { getStories } from '../Api/story.api';
import { getSkills } from '../Api/skill.api';
import { getExperiences } from '../Api/experience.api';
import { getCertificates } from '../Api/certificate.api';
import { getSettings } from '../Api/settings.api';
import { getTestimonials } from '../Api/testimonial.api';
import { getActiveResume } from '../Api/resume.api';
import { sendContactMessage } from '../Api/contact.api';

// Thunk to fetch all public portfolio website data in parallel
export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      const [
        projectsRes,
        storiesRes,
        skillsRes,
        experienceRes,
        certificatesRes,
        settingsRes,
        testimonialsRes,
        resumeRes,
      ] = await Promise.all([
        getProjects(),
        getStories(),
        getSkills(),
        getExperiences(),
        getCertificates(),
        getSettings(),
        getTestimonials(),
        getActiveResume().catch(() => ({ data: null })), // Catch error if no active resume is seeded yet
      ]);

      return {
        projects: projectsRes.data,
        stories: storiesRes.data,
        skills: skillsRes.data,
        experience: experienceRes.data,
        certificates: certificatesRes.data,
        settings: settingsRes.data,
        testimonials: testimonialsRes.data,
        activeResume: resumeRes.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load portfolio details'
      );
    }
  }
);

// Thunk to send message via contact form
export const submitContactForm = createAsyncThunk(
  'portfolio/submitContact',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await sendContactMessage(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send message'
      );
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    projects: [],
    stories: [],
    skills: [],
    experience: [],
    certificates: [],
    testimonials: [],
    settings: null,
    activeResume: null,
    loading: false,
    error: null,
    submitContactStatus: 'idle',
    submitContactError: null,
  },
  reducers: {
    resetContactStatus: (state) => {
      state.submitContactStatus = 'idle';
      state.submitContactError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Data
      .addCase(fetchPortfolioData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects || [];
        state.stories = action.payload.stories || [];
        state.skills = action.payload.skills || [];
        state.experience = action.payload.experience || [];
        state.certificates = action.payload.certificates || [];
        state.settings = action.payload.settings || null;
        state.testimonials = action.payload.testimonials || [];
        state.activeResume = action.payload.activeResume || null;
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit Contact Form
      .addCase(submitContactForm.pending, (state) => {
        state.submitContactStatus = 'loading';
        state.submitContactError = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.submitContactStatus = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submitContactStatus = 'failed';
        state.submitContactError = action.payload;
      });
  },
});

export const { resetContactStatus } = portfolioSlice.actions;
export default portfolioSlice.reducer;
