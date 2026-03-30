import Campaign from '../models/Campaign.js';
import { localCampaignInstitutions } from '../data/localCampaignInstitutions.js';
import { sendSuccess } from '../utils/ApiResponse.js';

/**
 * Get all campaigns
 */
export const getCampaigns = async (req, res, next) => {
  try {
    const { city } = req.query;
    const normalizedCity = city ? city.trim().toLowerCase() : '';

    const campaigns = await Campaign.find()
      .sort({ date: 1 })
      .limit(20);

    const institutions = localCampaignInstitutions.filter(
      (institution) =>
        !normalizedCity || institution.city.toLowerCase() === normalizedCity
    );

    sendSuccess(res, 'Campaigns retrieved successfully', {
      city: city || null,
      campaigns,
      institutions,
    });
  } catch (error) {
    next(error);
  }
};
