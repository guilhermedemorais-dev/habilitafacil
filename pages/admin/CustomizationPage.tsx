
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNotification } from '../../contexts/NotificationContext';

const CustomizationPage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#34A853'); // Default habilita-green
  const [secondaryColor, setSecondaryColor] = useState('#0047AB'); // Default habilita-blue
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        addNotification('success', 'Personalização salva com sucesso!');
        // Here you would typically refetch the theme or update a global context
        console.log({ primaryColor, secondaryColor, logo });
      }, 1500);
  };

  return (
    <Card title="Personalização da Plataforma">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Color Palette Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Paleta de Cores</h3>
          <div className="space-y-4">
            <Input 
              label="Cor Primária" 
              id="primaryColor" 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
              className="p-1 h-10 w-full block" 
            />
            <Input 
              label="Cor Secundária" 
              id="secondaryColor" 
              type="color" 
              value={secondaryColor} 
              onChange={(e) => setSecondaryColor(e.target.value)} 
              className="p-1 h-10 w-full block"
            />
          </div>
          <h3 className="text-lg font-semibold mt-8 mb-4">Logo</h3>
          <Input 
              label="Enviar nova logo" 
              id="logoUpload" 
              type="file" 
              accept="image/*"
              onChange={handleLogoChange} 
            />
            {logoPreview && (
                <div className="mt-2 p-2 border rounded-md">
                    <img src={logoPreview} alt="Logo Preview" className="h-16" />
                </div>
            )}
          <Button className="mt-6 w-full" variant="primary" onClick={handleSave} isLoading={isLoading}>
            Salvar Alterações
          </Button>
        </div>

        {/* Live Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pré-visualização</h3>
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="h-8" /> : 'HabilitaFácil'}
              </h2>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: secondaryColor }}></div>
            </div>
            <p className="text-gray-600 mb-4">Este é um exemplo de como os componentes se parecerão com as novas cores.</p>
            <Button style={{ backgroundColor: primaryColor }} className="w-full mb-2">Botão Primário</Button>
            <Button style={{ backgroundColor: secondaryColor }} className="w-full">Botão Secundário</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomizationPage;
