import {Schema, model} from 'mongoose'


const weaponSchema = new Schema({
    _id:{type: String},
    name:{type: String},
    cost:{type: String},
    unlockCondition:{type: String},
    ammunition:{type: String},
    capacity:{type: String},
    damage: {type: Number},
    rateOfFire: {type: Number},
    reloadSpeed: {type: Number},
    meleeDamage:  {type: Number},
    effectiveRange: {type: Number},
    handling: {type: Number},
    muzzleVelocity: {type: Number},
    heavyMeleeDamage: {type: Number},
})

// export const weapons = model('weapons', weaponSchema)