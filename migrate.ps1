# QuestUp Migration Script

Write-Host "Starting migration..." -ForegroundColor Cyan
Write-Host ""

$backupPath = "src_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host "Backup to: $backupPath" -ForegroundColor Yellow
Copy-Item -Path "src" -Destination $backupPath -Recurse -Force

$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts" -File
$changedCount = 0
$totalFiles = $files.Count

Write-Host "Found $totalFiles files"
Write-Host ""

$replacements = @(
    @('bg-violet-deep', 'bg-primary/90'),
    @('bg-violet/10', 'bg-primary/10'),
    @('bg-violet/20', 'bg-primary/20'),
    @('bg-violet', 'bg-primary'),
    @('text-violet', 'text-primary'),
    @('border-violet/30', 'border-primary/30'),
    @('border-violet/20', 'border-primary/20'),
    @('border-violet', 'border-primary'),
    @('hover:border-violet/30', 'hover:border-primary/30'),
    @('hover:border-violet', 'hover:border-primary'),
    @('hover:text-violet', 'hover:text-primary'),
    @('hover:bg-violet-deep', 'hover:bg-primary/90'),
    @('focus:border-violet', 'focus:border-primary'),
    @('focus:ring-violet/10', 'focus:ring-primary/10'),
    @('from-violet/20', 'from-primary/20'),
    @('to-lilac/20', 'to-primary/10'),
    @('from-violet/10', 'from-primary/10'),
    @('to-lilac/10', 'to-primary/10'),
    @('text-lilac', 'text-primary/80'),
    @('bg-paper', 'bg-card'),
    @('bg-bg', 'bg-background'),
    @('bg-ink', 'bg-foreground'),
    @('text-ink', 'text-foreground'),
    @('text-muted', 'text-muted-foreground'),
    @('border-line', 'border-border'),
    @('bg-lime-deep', 'bg-green-600'),
    @('bg-lime/20', 'bg-green-500/20'),
    @('bg-lime/10', 'bg-green-500/10'),
    @('bg-lime', 'bg-green-500'),
    @('text-lime-deep', 'text-green-600'),
    @('text-lime', 'text-green-500'),
    @('border-lime/50', 'border-green-500/50'),
    @('border-lime/30', 'border-green-500/30'),
    @('border-lime-deep', 'border-green-600'),
    @('bg-amber-deep', 'bg-amber-600'),
    @('bg-amber/10', 'bg-amber-500/10'),
    @('bg-amber', 'bg-amber-500'),
    @('text-amber-deep', 'text-amber-600'),
    @('text-amber', 'text-amber-500'),
    @('border-amber/30', 'border-amber-500/30'),
    @('border-amber-deep', 'border-amber-600'),
    @('border-amber', 'border-amber-500'),
    @('bg-cherry/10', 'bg-destructive/10'),
    @('bg-cherry/20', 'bg-destructive/20'),
    @('bg-cherry', 'bg-destructive'),
    @('text-cherry', 'text-destructive'),
    @('border-cherry/30', 'border-destructive/30'),
    @('hover:border-cherry/30', 'hover:border-destructive/30'),
    @('hover:text-cherry', 'hover:text-destructive'),
    @('hover:bg-cherry/20', 'hover:bg-destructive/20'),
    @('rounded-xl2', 'rounded-lg'),
    @('rounded-3xl', 'rounded-xl'),
    @('rounded-2xl', 'rounded-lg'),
    @('shadow-soft', 'shadow-sm')
)

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $fileChanged = $false

    foreach ($replacement in $replacements) {
        $old = $replacement[0]
        $new = $replacement[1]
        
        if ($content -match [regex]::Escape($old)) {
            $content = $content -replace [regex]::Escape($old), $new
            $fileChanged = $true
        }
    }

    if ($fileChanged) {
        Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
        $changedCount++
        Write-Host "OK: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Migration complete!" -ForegroundColor Green
Write-Host "Changed $changedCount of $totalFiles files" -ForegroundColor White
Write-Host "Backup: $backupPath" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan