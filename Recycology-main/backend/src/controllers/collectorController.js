import GarbageCollector from '../models/GarbageCollector.js';
import { localCollectors } from '../data/localCollectors.js';
import { sendSuccess } from '../utils/ApiResponse.js';

/**
 * Get garbage collectors
 * Supports location-based filtering
 */
export const getCollectors = async (req, res, next) => {
  try {
    const { latitude, longitude, radius = 5000, city } = req.query;

    let query = {};
    const normalizedCity = city ? city.trim().toLowerCase() : '';

    // If location provided, use geospatial query
    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(radius), // in meters
        },
      };
    }

    if (normalizedCity) {
      query.address = { $regex: normalizedCity, $options: 'i' };
    }

    const dbCollectors = await GarbageCollector.find(query).limit(50);

    const normalizedDbCollectors = dbCollectors.map((collector) => ({
      id: collector._id.toString(),
      city:
        normalizedCity ||
        (collector.address.toLowerCase().includes('indore') ? 'Indore' : 'Bhopal'),
      name: collector.name,
      address: collector.address,
      contact: collector.contact || {},
      services: collector.services || [],
      operatingHours: collector.operatingHours || '',
      mapQuery: collector.address,
      sourceLabel: 'Recycology database',
      sourceUrl: '',
    }));

    const filteredLocalCollectors = localCollectors.filter(
      (collector) =>
        !normalizedCity || collector.city.toLowerCase() === normalizedCity
    );

    const mergedCollectors = [...normalizedDbCollectors];

    filteredLocalCollectors.forEach((collector) => {
      const alreadyPresent = mergedCollectors.some(
        (item) =>
          item.name.toLowerCase() === collector.name.toLowerCase() &&
          item.address.toLowerCase() === collector.address.toLowerCase()
      );

      if (!alreadyPresent) {
        mergedCollectors.push(collector);
      }
    });

    sendSuccess(res, 'Collectors retrieved successfully', {
      city: city || null,
      collectors: mergedCollectors,
    });
  } catch (error) {
    next(error);
  }
};
