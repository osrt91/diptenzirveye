import crypto from 'crypto';

/**
 * PayTR Ödeme Paketi Hazırlama Fonksiyonu
 */
export function generatePaytrToken(params: {
    merchant_id: string;
    user_ip: string;
    merchant_oid: string;
    email: string;
    payment_amount: number;
    user_basket: string;
    debug_on: number;
    no_shipping: number;
    merchant_ok_url: string;
    merchant_fail_url: string;
    user_name: string;
    user_address: string;
    user_phone: string;
    currency: string;
    test_mode: number;
    merchant_salt: string;
    merchant_key: string;
}) {
    const {
        merchant_id,
        user_ip,
        merchant_oid,
        email,
        payment_amount,
        user_basket,
        debug_on,
        no_shipping,
        merchant_ok_url,
        merchant_fail_url,
        user_name,
        user_address,
        user_phone,
        currency,
        test_mode,
        merchant_salt,
        merchant_key,
    } = params;

    const hashString =
        merchant_id +
        user_ip +
        merchant_oid +
        email +
        payment_amount +
        user_basket +
        no_shipping +
        merchant_ok_url +
        merchant_fail_url +
        currency +
        test_mode +
        merchant_salt;

    const paytr_token = crypto
        .createHmac('sha256', merchant_key)
        .update(hashString)
        .digest('base64');

    return paytr_token;
}
