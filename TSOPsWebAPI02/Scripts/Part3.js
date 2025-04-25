class SkillNameConversion {
    // a class to translate between language name,
    // phone system id, and phone system skill name string

    /* skillIdDictionary = {
        fl_english_ib: 123,
        fl_noc_ib: 456,
        fl_spanish_ib: 789,
        fl_portuguese_ib: 1011,
    }*/

    /* static skillIdDictionary = {
        fl_english_ib: 123,
        fl_noc_ib: 456,
        fl_spanish_ib: 789,
        fl_portuguese_ib: 1011,
    } */

    static skillIdDictionary = {
        FL_English_IB: 123,
        FL_NOC_IB: 456,
        FL_Spanish_IB: 789,
        FL_Portuguese_IB: 1011,
    }

    static skillPrefix = 'FL_'
    static skillSuffix = '_IB'

    static skillNameIntoLanguageName(skillName) {
        return skillName.slice(3, -3)
    }

    static skillNameIntoLanguageName(skillName) {
        return skillName.slice(this.skillPrefix.length, -this.skillSuffix.length);
    }

    /* static languageNameIntoSkillName(language) {
        return `FL_${language}}IB`
    }*/

    /* static languageNameIntoSkillName(language) {
        return `FL_${language}IB`
    }*/

    static languageNameIntoSkillName(language) {
        return `${this.skillPrefix}${language}${this.skillSuffix}`;
    }

    static skillNameIntoSkillId(skillName) {
        return this.skillIdDictionary[skillName]
    }

    /* static skillIdIntoSkillName(skillId) {
        for (const skillNameFromSkillMap of Object.keys(this.skillIdDictionary)) {
            if (this.skillIdDictionary[skillNameFromSkillMap] = skillId) {
                return skillNameFromSkillMap
            }
        }
        throw new Error("The provided skill ID was not found in the skill ID dict ionary.")
    }*/

    static skillIdIntoSkillName(skillId) {
        for (const skillNameFromSkillMap of Object.keys(this.skillIdDictionary)) {
            if (this.skillIdDictionary[skillNameFromSkillMap] === skillId) {
                return skillNameFromSkillMap
            }
        }
        throw new Error("The provided skill ID was not found in the skill ID dict ionary.")
    }

    /* static skillIdIntoLanguageName(skillId) {
        this.skillIdIntoSkillName(
            this.skillNameIntoLanguageName(skillId)
        )
    }*/

    /* static skillIdIntoLanguageName(skillId) {
        const skillName = this.skillIdIntoSkillName(skillId);
        return this.skillNameIntoLanguageName(skillName);
    }*/ 

    static skillIdIntoLanguageName(skillId) {
        return this.skillNameIntoLanguageName(
            this.skillIdIntoSkillName(skillId)
        );
    }

    /* static languageNameIntoSkillId(language) {
        this.skillNameIntoSkillId(
            this.languageNameIntoSkillName(language)
        )
    }*/

    static languageNameIntoSkillId(language) {
        return this.skillNameIntoSkillId(
            this.languageNameIntoSkillName(language)
        )
    }

}

/* class Skill {
    // a class which models an InContact skill
    static skillId
    static languageName

    constructor(skillName) {
        this.skillName = skillName
        this.languageName = SkillNameConversion.skillNameIntoLanguageName(skillName)
        this.skillId = SkillNameConversion.skillNameIntoSkillId(skillName)
    }
}*/

class Skill {
    // a class which models an InContact skill
    skillId
    languageName

    constructor(skillName) {
        this.skillName = skillName
        this.languageName = SkillNameConversion.skillNameIntoLanguageName(skillName)
        this.skillId = SkillNameConversion.skillNameIntoSkillId(skillName)
    }
}

// === Test Code ===

// Instantiate a Skill object
const testSkill = new Skill('FL_English_IB');
console.log('Skill Object:', testSkill);

// Try converting skill ID into language name
const lang = SkillNameConversion.skillIdIntoLanguageName(123);
console.log('Language from Skill ID 123:', lang);

// Try converting language into skill ID
const skillId = SkillNameConversion.languageNameIntoSkillId('Portuguese');
console.log('Skill ID for Portuguese:', skillId);

// Try reverse mapping (ID -> Name)
const skillName = SkillNameConversion.skillIdIntoSkillName(456);
console.log('Skill Name for ID 456:', skillName);