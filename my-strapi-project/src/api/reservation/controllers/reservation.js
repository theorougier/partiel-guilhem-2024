// path: src/api/reservation/controllers/reservation.js

'use strict';

/**
 * reservation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reservation.reservation', ({ strapi }) => ({
  async create(ctx) {
    // @ts-ignore
    const { activity, location, date, time, user } = ctx.request.body.data;

    // Vérifier si une réservation existe déjà pour cette activité, cet endroit, cette date et cette heure
    const existingReservation = await strapi.db.query('api::reservation.reservation').findOne({
      where: { activity, location, date, time }
    });

    if (existingReservation) {
      return ctx.badRequest('This time slot is already booked');
    }

    // Sinon, créer une nouvelle réservation
    const reservation = await strapi.entityService.create('api::reservation.reservation', {
      data: { activity, location, date, time, user },
    });

    return reservation;
  },
}));
