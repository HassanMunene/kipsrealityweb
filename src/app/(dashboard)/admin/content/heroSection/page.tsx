'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Trash2, Upload, Eye, Palette, Image, Settings, Zap, TrendingUp } from 'lucide-react';

// Available icons for features
const availableIcons = ['Zap', 'Shield', 'TrendingUp', 'Building2', 'Users', 'CheckCircle', 'Play', 'ArrowRight'];

export default function HeroEditor() {
    const [activeTab, setActiveTab] = useState('content');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    const [heroData, setHeroData] = useState({
        // Main Content
        mainHeading: "Manage Your Properties",
        gradientText: "Like a Pro",
        subheading: "Transform how you manage properties with our all-in-one platform. Automate rent collection, streamline maintenance, and boost ROI with AI-powered insights trusted by industry leaders.",
        ctaPrimary: "Start Free Trial",
        ctaSecondary: "Watch Demo",

        // Background
        backgroundImage: "/images/hero-cityscape.jpg",

        // Features
        features: [
            { id: '1', icon: 'Zap', text: '90% Faster Rent Collection', subtext: 'Automated payments', order: 0 },
            { id: '2', icon: 'Shield', text: 'Bank-Level Security', subtext: 'SOC 2 Certified', order: 1 },
            { id: '3', icon: 'TrendingUp', text: '27% Higher ROI', subtext: 'Average increase', order: 2 },
            { id: '4', icon: 'Building2', text: 'Unlimited Properties', subtext: 'Scale effortlessly', order: 3 },
            { id: '5', icon: 'Users', text: 'Happy Tenants', subtext: '4.8/5 satisfaction', order: 4 },
            { id: '6', icon: 'CheckCircle', text: '24/7 Support', subtext: 'Always available', order: 5 }
        ],

        // Stats
        stats: [
            { id: '1', label: 'Monthly Revenue', value: '$124,580', trend: '+12%', color: 'green', order: 0 },
            { id: '2', label: 'Occupancy Rate', value: '98.2%', trend: '+2.1%', color: 'green', order: 1 },
            { id: '3', label: 'Maintenance', value: '3 Active', trend: '-67%', color: 'blue', order: 2 },
            { id: '4', label: 'Satisfaction', value: '4.8/5', trend: '+0.3', color: 'yellow', order: 3 }
        ],

        // Design Settings
        design: {
            overlayOpacity: 95,
            gradientIntensity: 80,
            orbAnimation: true
        }
    });

    // Load existing content
    useEffect(() => {
        loadHeroContent();
    }, []);

    const loadHeroContent = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/hero');
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setHeroData(prev => ({ ...prev, ...data }));
                }
            }
        } catch (error) {
            console.error('Error loading hero content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveHeroContent = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/admin/hero', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(heroData),
            });

            if (response.ok) {
                // Show success notification
                console.log('Hero section updated successfully!');
            } else {
                console.error('Error updating hero section');
            }
        } catch (error) {
            console.error('Error saving hero content:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const updateField = (field: string, value: any) => {
        setHeroData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const updateDesignSetting = (field: string, value: any) => {
        setHeroData(prev => ({
            ...prev,
            design: {
                ...prev.design,
                [field]: value
            }
        }));
    };

    const addFeature = () => {
        const newFeature = {
            id: Date.now().toString(),
            icon: 'Zap',
            text: 'New Feature',
            subtext: 'Feature description',
            order: heroData.features.length
        };
        setHeroData(prev => ({
            ...prev,
            features: [...prev.features, newFeature]
        }));
    };

    const updateFeature = (index: number, field: string, value: string) => {
        const updatedFeatures = [...heroData.features];
        updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
        setHeroData(prev => ({ ...prev, features: updatedFeatures }));
    };

    const removeFeature = (index: number) => {
        setHeroData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const addStat = () => {
        const newStat = {
            id: Date.now().toString(),
            label: 'New Stat',
            value: '100%',
            trend: '+0%',
            color: 'green',
            order: heroData.stats.length
        };
        setHeroData(prev => ({
            ...prev,
            stats: [...prev.stats, newStat]
        }));
    };

    const updateStat = (index: number, field: string, value: string) => {
        const updatedStats = [...heroData.stats];
        updatedStats[index] = { ...updatedStats[index], [field]: value };
        setHeroData(prev => ({ ...prev, stats: updatedStats }));
    };

    const removeStat = (index: number) => {
        setHeroData(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = async (file: File) => {
        // Implement image upload logic
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                updateField('backgroundImage', data.url);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading hero content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Hero Section Editor</h1>
                            <p className="text-gray-600">Customize your landing page hero section</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setPreviewMode(!previewMode)}
                                className="flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                {previewMode ? 'Edit Mode' : 'Preview'}
                            </Button>
                            <Button
                                onClick={saveHeroContent}
                                disabled={isSaving}
                                className="flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {previewMode ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        <div className="bg-gray-100 rounded-lg p-4">
                            {/* Preview component would go here */}
                            <p className="text-gray-600 text-center py-8">
                                Preview mode - Hero section would be displayed here
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        {/* Main Content Column */}
                        <div className="xl:col-span-3 space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid grid-cols-4 mb-6">
                                    <TabsTrigger value="content" className="flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Content
                                    </TabsTrigger>
                                    <TabsTrigger value="features" className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Features
                                    </TabsTrigger>
                                    <TabsTrigger value="stats" className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Stats
                                    </TabsTrigger>
                                    <TabsTrigger value="design" className="flex items-center gap-2">
                                        <Palette className="w-4 h-4" />
                                        Design
                                    </TabsTrigger>
                                </TabsList>

                                {/* Content Tab */}
                                <TabsContent value="content" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Main Content</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Main Heading</label>
                                                    <Input
                                                        value={heroData.mainHeading}
                                                        onChange={(e) => updateField('mainHeading', e.target.value)}
                                                        placeholder="Main heading text"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Gradient Text</label>
                                                    <Input
                                                        value={heroData.gradientText}
                                                        onChange={(e) => updateField('gradientText', e.target.value)}
                                                        placeholder="Text with gradient effect"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Subheading</label>
                                                <Textarea
                                                    value={heroData.subheading}
                                                    onChange={(e) => updateField('subheading', e.target.value)}
                                                    placeholder="Detailed description"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Primary CTA</label>
                                                    <Input
                                                        value={heroData.ctaPrimary}
                                                        onChange={(e) => updateField('ctaPrimary', e.target.value)}
                                                        placeholder="Start Free Trial"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Secondary CTA</label>
                                                    <Input
                                                        value={heroData.ctaSecondary}
                                                        onChange={(e) => updateField('ctaSecondary', e.target.value)}
                                                        placeholder="Watch Demo"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Image className="w-4 h-4" />
                                                Background Image
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <Input
                                                        value={heroData.backgroundImage}
                                                        onChange={(e) => updateField('backgroundImage', e.target.value)}
                                                        placeholder="/images/hero-bg.jpg"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="file"
                                                        id="background-upload"
                                                        className="hidden"
                                                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                                                        accept="image/*"
                                                    />
                                                    <label htmlFor="background-upload">
                                                        <Button variant="outline" asChild>
                                                            <span className="flex items-center gap-2">
                                                                <Upload className="w-4 h-4" />
                                                                Upload
                                                            </span>
                                                        </Button>
                                                    </label>
                                                </div>
                                            </div>
                                            {heroData.backgroundImage && (
                                                <div className="mt-4">
                                                    <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                                                        <img
                                                            src={heroData.backgroundImage}
                                                            alt="Background preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Features Tab */}
                                <TabsContent value="features" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                Feature Points
                                                <Button onClick={addFeature} size="sm">
                                                    <Plus className="w-4 h-4 mr-1" />
                                                    Add Feature
                                                </Button>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {heroData.features.map((feature, index) => (
                                                    <div key={feature.id} className="p-4 border rounded-lg space-y-3">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-medium">Feature {index + 1}</h4>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => removeFeature(index)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Icon</label>
                                                            <select
                                                                value={feature.icon}
                                                                onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                                                                className="w-full p-2 border rounded"
                                                            >
                                                                {availableIcons.map(icon => (
                                                                    <option key={icon} value={icon}>{icon}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Title</label>
                                                            <Input
                                                                value={feature.text}
                                                                onChange={(e) => updateFeature(index, 'text', e.target.value)}
                                                                placeholder="Feature title"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Description</label>
                                                            <Input
                                                                value={feature.subtext}
                                                                onChange={(e) => updateFeature(index, 'subtext', e.target.value)}
                                                                placeholder="Feature description"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Stats Tab */}
                                <TabsContent value="stats" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                Dashboard Statistics
                                                <Button onClick={addStat} size="sm">
                                                    <Plus className="w-4 h-4 mr-1" />
                                                    Add Stat
                                                </Button>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {heroData.stats.map((stat, index) => (
                                                    <div key={stat.id} className="p-4 border rounded-lg space-y-3">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-medium">Stat {index + 1}</h4>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => removeStat(index)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Label</label>
                                                                <Input
                                                                    value={stat.label}
                                                                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                                                                    placeholder="Monthly Revenue"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Value</label>
                                                                <Input
                                                                    value={stat.value}
                                                                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                                                                    placeholder="$124,580"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Trend</label>
                                                                <Input
                                                                    value={stat.trend}
                                                                    onChange={(e) => updateStat(index, 'trend', e.target.value)}
                                                                    placeholder="+12%"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Color</label>
                                                                <select
                                                                    value={stat.color}
                                                                    onChange={(e) => updateStat(index, 'color', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                >
                                                                    <option value="green">Green</option>
                                                                    <option value="blue">Blue</option>
                                                                    <option value="yellow">Yellow</option>
                                                                    <option value="red">Red</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Design Tab */}
                                <TabsContent value="design" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Design Settings</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Overlay Opacity: {heroData.design.overlayOpacity}%
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={heroData.design.overlayOpacity}
                                                    onChange={(e) => updateDesignSetting('overlayOpacity', parseInt(e.target.value))}
                                                    className="w-full"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Gradient Intensity: {heroData.design.gradientIntensity}%
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={heroData.design.gradientIntensity}
                                                    onChange={(e) => updateDesignSetting('gradientIntensity', parseInt(e.target.value))}
                                                    className="w-full"
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="orb-animation"
                                                    checked={heroData.design.orbAnimation}
                                                    onChange={(e) => updateDesignSetting('orbAnimation', e.target.checked)}
                                                    className="rounded"
                                                />
                                                <label htmlFor="orb-animation" className="text-sm font-medium">
                                                    Enable Floating Orb Animations
                                                </label>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Preview Sidebar */}
                        <div className="xl:col-span-1">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle>Live Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg p-4 text-white">
                                            <h3 className="font-bold text-lg mb-2">Hero Section Preview</h3>
                                            <p className="text-sm opacity-90">Changes update in real-time</p>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Content Items</p>
                                                <p className="text-xs text-gray-500">{heroData.features.length} features, {heroData.stats.length} stats</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() => setPreviewMode(true)}
                                                >
                                                    Full Preview
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={saveHeroContent}
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? 'Saving...' : 'Save'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}