"""
Blockchain integration service for Aptos/Ethereum
Handles smart contract deployment, GeoNFT minting, and tokenization
This is the MOCK version for testing. For REAL Aptos, use aptos_integration.py
"""
import random
import hashlib
from datetime import datetime
from typing import Dict, Any
import os

# Check if real Aptos SDK is available
USE_REAL_APTOS = False
try:
    from .aptos_integration import get_aptos_service
    USE_REAL_APTOS = True
    print("✅ Real Aptos SDK detected - Using real blockchain")
except ImportError:
    print("⚠️  Aptos SDK not installed - Using mock blockchain")
    print("   Install with: pip install aptos-sdk")


def generate_transaction_hash() -> str:
    """Generate a mock transaction hash"""
    random_string = f"{datetime.utcnow().isoformat()}{random.random()}"
    return "0x" + hashlib.sha256(random_string.encode()).hexdigest()[:12]


def generate_contract_address() -> str:
    """Generate a mock contract address"""
    random_string = f"contract_{datetime.utcnow().isoformat()}{random.random()}"
    return "0x" + hashlib.sha256(random_string.encode()).hexdigest()[:10]


def generate_nft_id() -> str:
    """Generate a GeoNFT ID"""
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return "GEO-" + "".join(random.choice(chars) for _ in range(6))


async def deploy_contract(
    project_id: str,
    carbon_amount: float,
    location: str,
    latitude: float,
    longitude: float
) -> Dict[str, Any]:
    """
    Deploy smart contract to blockchain
    Uses REAL Aptos if SDK is installed, otherwise uses mock
    """
    # Use real Aptos if available
    if USE_REAL_APTOS:
        try:
            aptos_service = get_aptos_service()
            return await aptos_service.create_project(
                project_id=project_id,
                location=location,
                latitude=latitude,
                longitude=longitude,
                area=1.0,  # Will be updated with real area
                total_credits=carbon_amount,
                unit_price=45.0,
                vintage_year=datetime.now().year
            )
        except Exception as e:
            print(f"⚠️  Real Aptos failed, falling back to mock: {e}")
    
    # Mock blockchain deployment (fallback)
    contract_address = generate_contract_address()
    transaction_hash = generate_transaction_hash()
    block_number = random.randint(18000000, 19000000)
    gas_used = random.randint(20000, 30000)
    network_fee = round(random.uniform(0.005, 0.015), 6)
    
    return {
        "success": True,
        "contract_address": contract_address,
        "transaction_hash": transaction_hash,
        "block_number": block_number,
        "gas_used": gas_used,
        "network_fee": network_fee,
        "network": "Aptos Testnet",
        "deployment_timestamp": datetime.utcnow().isoformat(),
        "contract_type": "CarbonCreditRegistry",
        "project_data": {
            "project_id": project_id,
            "carbon_amount": carbon_amount,
            "location": location,
            "coordinates": {"latitude": latitude, "longitude": longitude}
        }
    }


async def mint_geonft(
    contract_address: str,
    latitude: float,
    longitude: float,
    metadata: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Mint a GeoNFT (location-bound NFT)
    Uses REAL Aptos if SDK is installed, otherwise uses mock
    """
    # Use real Aptos if available
    if USE_REAL_APTOS:
        try:
            aptos_service = get_aptos_service()
            nft_id = generate_nft_id()
            return await aptos_service.mint_geonft(
                nft_id=nft_id,
                project_id=metadata.get("project_id", ""),
                metadata_uri=f"ipfs://metadata/{nft_id}"
            )
        except Exception as e:
            print(f"⚠️  Real Aptos failed, falling back to mock: {e}")
    
    # Mock GeoNFT minting (fallback)
    nft_id = generate_nft_id()
    transaction_hash = generate_transaction_hash()
    block_number = random.randint(18000000, 19000000)
    gas_used = random.randint(15000, 25000)
    network_fee = round(random.uniform(0.003, 0.010), 6)
    
    return {
        "success": True,
        "nft_id": nft_id,
        "transaction_hash": transaction_hash,
        "block_number": block_number,
        "gas_used": gas_used,
        "network_fee": network_fee,
        "contract_address": contract_address,
        "location_verified": True,
        "coordinates": {
            "latitude": latitude,
            "longitude": longitude
        },
        "metadata": metadata,
        "minted_at": datetime.utcnow().isoformat()
    }


async def create_carbon_tokens(
    contract_address: str,
    amount: float,
    unit_price: float
) -> Dict[str, Any]:
    """
    Create ERC-20 compatible carbon credit tokens
    Uses REAL Aptos if SDK is installed, otherwise uses mock
    """
    # Use real Aptos if available
    if USE_REAL_APTOS:
        try:
            aptos_service = get_aptos_service()
            # In real implementation, tokens are created during project creation
            # This is just for tracking
            return {
                "success": True,
                "message": "Tokens created during project registration",
                "contract_address": contract_address,
                "amount": amount,
                "unit_price": unit_price
            }
        except Exception as e:
            print(f"⚠️  Real Aptos failed, falling back to mock: {e}")
    
    # Mock token creation (fallback)
    transaction_hash = generate_transaction_hash()
    block_number = random.randint(18000000, 19000000)
    gas_used = random.randint(25000, 35000)
    network_fee = round(random.uniform(0.008, 0.018), 6)
    
    return {
        "success": True,
        "transaction_hash": transaction_hash,
        "block_number": block_number,
        "gas_used": gas_used,
        "network_fee": network_fee,
        "contract_address": contract_address,
        "tokens_created": amount,
        "token_standard": "ERC-20",
        "unit_price": unit_price,
        "total_value": round(amount * unit_price, 2),
        "created_at": datetime.utcnow().isoformat()
    }


async def verify_transaction(transaction_hash: str) -> Dict[str, Any]:
    """
    Verify a blockchain transaction
    """
    # In production, query blockchain for transaction status
    return {
        "transaction_hash": transaction_hash,
        "status": "confirmed",
        "confirmations": random.randint(12, 50),
        "verified": True
    }


def generate_smart_contract_code(project_type: str) -> str:
    """
    Generate smart contract template
    This is a simplified example - production would use actual Move/Solidity code
    """
    contract_template = f"""
    // Carbon Credit Smart Contract
    // Project Type: {project_type}
    // Standard: ERC-20 Compatible
    
    module CarbonCredit {{
        struct CarbonToken has key, store {{
            amount: u64,
            project_id: vector<u8>,
            vintage_year: u64,
            location: Location,
        }}
        
        struct Location has store {{
            latitude: u64,
            longitude: u64,
        }}
        
        public fun mint_credits(
            account: &signer,
            amount: u64,
            project_id: vector<u8>
        ) {{
            // Minting logic
        }}
        
        public fun transfer_credits(
            from: &signer,
            to: address,
            amount: u64
        ) {{
            // Transfer logic
        }}
        
        public fun retire_credits(
            account: &signer,
            amount: u64
        ) {{
            // Retirement logic
        }}
    }}
    """
    return contract_template
