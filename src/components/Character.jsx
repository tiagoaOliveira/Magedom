import "./Character.css"
import { X, Sword, Shield, Heart, Rabbit } from "lucide-react";

export default function CharacterModal({
  isOpen, 
  onClose, 
  children, 
  equippedSkills = [],
  onSkillClick
}) {
  if (!isOpen) return null;

  // Garantir 4 slots de habilidades
  const skillSlots = Array(4).fill(null);
  equippedSkills.slice(0, 4).forEach((skill, index) => {
    skillSlots[index] = skill;
  });

  return (
    <div className="character-modal" onClick={onClose}>  
      <div className="character-modal-content" 
        onClick={(e) => e.stopPropagation()}>
        <button className="character-modal-close" 
          onClick={onClose}>
          <X color="yellow" size={32}/>
        </button>
        
        <div className="modal-infos">

          <div className="modal-habilities">
            {skillSlots.map((skill, index) => (
              <button 
                key={index} 
                className={`skill-slot ${skill ? 'equipped' : 'empty'}`}
                onClick={onSkillClick}
                title={skill ? skill.skill.name : 'Slot vazio - Clique para abrir inventário'}
              >
                {skill ? (
                  skill.skill.image ? (
                    <img 
                      src={skill.skill.image} 
                      alt={skill.skill.name}
                      className="skill-image"
                    />
                  ) : (
                    <span className="skill-initial">
                      {skill.skill.name.charAt(0)}
                    </span>
                  )
                ) : (
                  <span className="skill-empty-icon">+</span>
                )}
              </button>
            ))}
          </div>

          <div className="modal-stats">
            <p><Heart size={28} color="#ff4444"/>Vida: 100</p>
            <p><Sword size={28} color="#ff8844"/>Ataque: 50</p>
            <p><Shield size={28} color="#4488ff"/>Defesa: 30</p>
            <p><Rabbit size={28} color="#44ff88"/>Aceleração: 20</p>
          </div>
        </div>

        {children}
      </div>              
    </div>
  )
}