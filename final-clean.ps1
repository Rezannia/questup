# Final Cleanup Script

Write-Host "Starting final cleanup..." -ForegroundColor Cyan
Write-Host ""

$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts" -File
$changedCount = 0

# لیست جایگزینی‌های نهایی
$replacements = @(
    # حذف رنگ‌های هاردکد
    @('bg-amber-50', 'bg-secondary'),
    @('bg-amber-100/50', 'bg-secondary/50'),
    @('bg-zinc-50', 'bg-secondary/50'),
    @('bg-zinc-400', 'bg-muted-foreground'),
    @('text-amber-950', 'text-foreground'),
    @('text-amber-50', 'text-primary-foreground'),
    @('text-zinc-900', 'text-foreground'),
    @('bg-amber-400', 'bg-primary'),
    @('border-amber-400', 'border-primary'),
    @('bg-amber-600', 'bg-primary/80'),
    @('border-amber-600', 'border-primary/80'),
    @('text-amber-600', 'text-primary'),
    
    # حذف گرادیانت‌های قدیمی
    @('from-amber to-orange-500', 'bg-primary'),
    @('from-violet to-lilac', 'bg-primary'),
    @('from-primary/20 to-primary/10', 'bg-secondary'),
    
    # حذف سایه‌های اضافی
    @('shadow-2xl', 'shadow-lg'),
    @('shadow-xl', 'shadow-md'),
    @('hover:shadow-xl', 'hover:shadow-md'),
    @('hover:shadow-2xl', 'hover:shadow-lg'),
    
    # حذف گردی‌های اضافی
    @('rounded-3xl', 'rounded-xl'),
    @('rounded-2xl', 'rounded-lg'),
    @('rounded-xl2', 'rounded-lg'),
    
    # حذف کلاس‌های تزئینی
    @('backdrop-blur-md', ''),
    @('backdrop-blur-lg', ''),
    @('backdrop-blur-sm', ''),
    @('animate-bounce', ''),
    @('animate-pulse', ''),
    
    # رنگ‌های باقی‌مانده
    @('text-amber-deep', 'text-primary'),
    @('bg-amber/10', 'bg-secondary'),
    @('bg-amber/20', 'bg-secondary/50'),
    @('border-amber/30', 'border-border'),
    @('border-amber/50', 'border-border'),
    @('text-amber', 'text-primary'),
    @('bg-lime/10', 'bg-secondary'),
    @('bg-lime/20', 'bg-secondary/50'),
    @('text-lime-deep', 'text-primary'),
    @('text-lime', 'text-primary'),
    @('border-lime/30', 'border-border'),
    @('border-lime/50', 'border-border'),
    @('border-lime-deep', 'border-primary'),
    @('bg-lime-deep', 'bg-primary'),
    @('bg-lime', 'bg-primary'),
    @('bg-cherry/10', 'bg-destructive/10'),
    @('bg-cherry/20', 'bg-destructive/20'),
    @('text-cherry', 'text-destructive'),
    @('border-cherry/30', 'border-destructive/30'),
    @('bg-cherry', 'bg-destructive')
)

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $originalContent = $content
    $fileChanged = $false

    foreach ($replacement in $replacements) {
        $old = $replacement[0]
        $new = $replacement[1]
        
        if ($content.Contains($old)) {
            $content = $content.Replace($old, $new)
            $fileChanged = $true
        }
    }

    if ($fileChanged) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $changedCount++
        Write-Host "  OK: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host "Changed $changedCount files" -ForegroundColor White
Write-Host "================================" -ForegroundColor Cyan