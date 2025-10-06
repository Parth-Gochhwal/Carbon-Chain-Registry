"""
Binance API Integration for Real-Time Carbon Credit Pricing
Uses Binance API to get cryptocurrency prices and apply to carbon credits
"""
import requests
import asyncio
from typing import Dict, Any, Optional
from datetime import datetime
import os

class BinancePriceService:
    """Service to fetch real-time prices from Binance and calculate carbon credit values"""
    
    def __init__(self):
        self.base_url = "https://api.binance.com/api/v3"
        self.base_carbon_price = 45.0  # Base price in USD
        self.price_cache = {}
        self.last_update = None
        
    async def get_crypto_price(self, symbol: str = "BTCUSDT") -> Optional[float]:
        """Get current cryptocurrency price from Binance"""
        try:
            url = f"{self.base_url}/ticker/price"
            params = {"symbol": symbol}
            
            response = requests.get(url, params=params, timeout=5)
            response.raise_for_status()
            
            data = response.json()
            price = float(data.get("price", 0))
            
            self.price_cache[symbol] = price
            self.last_update = datetime.utcnow()
            
            return price
        except Exception as e:
            print(f"❌ Failed to fetch {symbol} price: {e}")
            return self.price_cache.get(symbol)
    
    async def get_multiple_prices(self, symbols: list = None) -> Dict[str, float]:
        """Get multiple cryptocurrency prices"""
        if symbols is None:
            symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "APTUSDT"]
        
        try:
            url = f"{self.base_url}/ticker/price"
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            
            all_prices = response.json()
            
            # Filter for requested symbols
            filtered_prices = {}
            for item in all_prices:
                if item["symbol"] in symbols:
                    filtered_prices[item["symbol"]] = float(item["price"])
            
            # Update cache
            self.price_cache.update(filtered_prices)
            self.last_update = datetime.utcnow()
            
            return filtered_prices
        except Exception as e:
            print(f"❌ Failed to fetch multiple prices: {e}")
            return {symbol: self.price_cache.get(symbol, 0) for symbol in symbols}

    async def get_carbon_market_data(self) -> Dict[str, Any]:
        """Get carbon credit market data with crypto correlation"""
        try:
            # Get BTC price for correlation
            btc_price = await self.get_crypto_price("BTCUSDT")
            
            if not btc_price:
                btc_price = 43000.0  # Fallback price
            
            # Calculate price change (mock for demo)
            btc_change_percent = (btc_price - 43000) / 43000 * 100
            
            # Apply 20% correlation to carbon price
            carbon_price_change = btc_change_percent * 0.2
            current_carbon_price = self.base_carbon_price * (1 + carbon_price_change / 100)
            
            # Calculate 24h high/low
            high_24h = current_carbon_price * 1.05
            low_24h = current_carbon_price * 0.95
            
            # Determine market sentiment
            if carbon_price_change > 2:
                sentiment = "Bullish"
                demand_level = "High"
            elif carbon_price_change > 0:
                sentiment = "Positive"
                demand_level = "Medium"
            elif carbon_price_change > -2:
                sentiment = "Neutral"
                demand_level = "Medium"
            else:
                sentiment = "Bearish"
                demand_level = "Low"
            
            return {
                "current_price": round(current_carbon_price, 2),
                "price_change_24h": round(carbon_price_change, 2),
                "price_change_percent": round(carbon_price_change, 2),
                "high_24h": round(high_24h, 2),
                "low_24h": round(low_24h, 2),
                "market_sentiment": sentiment,
                "demand_level": demand_level,
                "crypto_influence": {
                    "btc_price": btc_price,
                    "btc_change_percent": round(btc_change_percent, 2),
                    "correlation_factor": 0.2
                },
                "last_updated": datetime.utcnow().isoformat()
            }
        except Exception as e:
            print(f"❌ Failed to get carbon market data: {e}")
            # Return fallback data
            return {
                "current_price": self.base_carbon_price,
                "price_change_24h": 0.0,
                "price_change_percent": 0.0,
                "high_24h": self.base_carbon_price * 1.05,
                "low_24h": self.base_carbon_price * 0.95,
                "market_sentiment": "Neutral",
                "demand_level": "Medium",
                "crypto_influence": {
                    "btc_price": 43000.0,
                    "btc_change_percent": 0.0,
                    "correlation_factor": 0.2
                },
                "last_updated": datetime.utcnow().isoformat()
            }

    async def calculate_portfolio_value(self, carbon_credits: float) -> Dict[str, Any]:
        """Calculate portfolio value with real-time pricing"""
        market_data = await self.get_carbon_market_data()
        current_price = market_data["current_price"]
        
        total_value = carbon_credits * current_price
        daily_change = total_value * (market_data["price_change_percent"] / 100)
        
        return {
            "carbon_credits": carbon_credits,
            "current_price": current_price,
            "total_value": round(total_value, 2),
            "daily_change": round(daily_change, 2),
            "daily_change_percent": market_data["price_change_percent"],
            "market_sentiment": market_data["market_sentiment"],
            "last_updated": market_data["last_updated"]
        }


# Global service instance
_price_service = None

def get_price_service() -> BinancePriceService:
    """Get or create price service instance"""
    global _price_service
    if _price_service is None:
        _price_service = BinancePriceService()
    return _price_service

async def start_price_updater(interval: int = 1):
    """Start background price updater"""
    service = get_price_service()
    
    while True:
        try:
            await service.get_multiple_prices()
            print(f"💹 Updated crypto prices at {datetime.utcnow().strftime('%H:%M:%S')}")
        except Exception as e:
            print(f"⚠️  Price update failed: {e}")
        
        await asyncio.sleep(interval)
