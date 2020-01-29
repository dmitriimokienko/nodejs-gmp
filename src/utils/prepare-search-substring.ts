import { Op } from 'sequelize';

export const prepareSearchSubstring = (loginSubstring?: string) =>
    loginSubstring ? { [Op.like]: `%${loginSubstring}%` } : undefined;
