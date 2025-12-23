import { supabase } from './supabaseClient';

// ============================================
// USUÁRIO
// ============================================
export const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ============================================
// LOOT SYSTEM - SEGURO (executado no servidor)
// ============================================
export const generateLoot = async (userId) => {
  try {
    const { data, error } = await supabase.rpc('generate_loot', {
      p_user_id: userId
    });

    if (error) throw error;

    return data; // ✅ retorna exatamente o JSON do banco
  } catch (error) {
    console.error('Erro ao gerar loot:', error);
    throw error;
  }
};


// ============================================
// INVENTÁRIO - SKILLS
// ============================================
export const getUserSkills = async (userId) => {
  const { data, error } = await supabase
    .from('user_skills')
    .select(`
      *,
      skill:skills(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getEquippedSkills = async (userId) => {
  const { data, error } = await supabase
    .from('user_skills')
    .select(`
      *,
      skill:skills(*)
    `)
    .eq('user_id', userId)
    .eq('equipada', true);

  if (error) throw error;
  return data;
};

export const toggleSkillEquipped = async (userId, skillId) => {
  const { data, error } = await supabase.rpc('toggle_skill_equipped', {
    p_user_id: userId,
    p_skill_id: skillId
  });

  if (error) throw error;
  return data;
};

export const convertSkillToXP = async (userId, skillId, quantidade = 1) => {
  const { data, error } = await supabase.rpc('convert_skill_to_xp', {
    p_user_id: userId,
    p_skill_id: skillId,
    p_quantidade: quantidade
  });

  if (error) throw error;
  return data;
};

// ============================================
// INVENTÁRIO - XP ITEMS
// ============================================
export const getUserXPItems = async (userId) => {
  const { data, error } = await supabase
    .from('user_xp_items')
    .select(`
      *,
      item:xp_item_definitions(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const useXPItem = async (userId, itemId, quantidade = 1) => {
  const { data, error } = await supabase.rpc('use_xp_item', {
    p_user_id: userId,
    p_item_id: itemId,
    p_quantidade: quantidade
  });

  if (error) throw error;
  return data;
};

// ============================================
// MARKETPLACE
// ============================================
export const listItemOnMarketplace = async (userId, itemType, itemId, quantidade, preco) => {
  const { data, error } = await supabase.rpc('list_item_on_marketplace', {
    p_user_id: userId,
    p_item_type: itemType,
    p_item_id: itemId,
    p_quantidade: quantidade,
    p_preco: preco
  });

  if (error) throw error;
  return data;
};

export const getMarketplaceListings = async (itemType = null) => {
  let query = supabase
    .from('marketplace_listings')
    .select(`
      *,
      seller:users!seller_id(id, nome, avatar)
    `)
    .eq('status', 'ativa')
    .order('created_at', { ascending: false });

  if (itemType) {
    query = query.eq('item_type', itemType);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Buscar detalhes dos itens
  const listingsWithDetails = await Promise.all(
    data.map(async (listing) => {
      if (listing.item_type === 'skill') {
        const { data: skill } = await supabase
          .from('skills')
          .select('*')
          .eq('id', listing.item_id)
          .single();
        return { ...listing, item_details: skill };
      } else {
        const { data: xpItem } = await supabase
          .from('xp_item_definitions')
          .select('*')
          .eq('id', listing.item_id)
          .single();
        return { ...listing, item_details: xpItem };
      }
    })
  );

  return listingsWithDetails;
};

export const buyFromMarketplace = async (userId, listingId) => {
  const { data, error } = await supabase.rpc('buy_from_marketplace', {
    p_buyer_id: userId,
    p_listing_id: listingId
  });

  if (error) throw error;
  return data;
};

export const cancelMarketplaceListing = async (userId, listingId) => {
  const { data, error } = await supabase.rpc('cancel_marketplace_listing', {
    p_user_id: userId,
    p_listing_id: listingId
  });

  if (error) throw error;
  return data;
};

export const getUserListings = async (userId) => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .select(`
      *
    `)
    .eq('seller_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// ============================================
// TRANSAÇÕES
// ============================================
export const getUserTransactions = async (userId, limit = 50) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
};

export default {
  getUserById,
  updateUserProfile,
  generateLoot,
  getUserSkills,
  getEquippedSkills,
  toggleSkillEquipped,
  convertSkillToXP,
  getUserXPItems,
  useXPItem,
  listItemOnMarketplace,
  getMarketplaceListings,
  buyFromMarketplace,
  cancelMarketplaceListing,
  getUserListings,
  getUserTransactions
};